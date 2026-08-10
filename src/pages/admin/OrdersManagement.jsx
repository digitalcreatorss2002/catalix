import { useEffect, useState } from 'react';
import { FiEye, FiPrinter, FiX } from 'react-icons/fi';
import { orderService, fileService } from '../../services/supabaseService';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await orderService.getAllOrders();
        if (!active) return;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading orders:', err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filteredOrders = orders.filter(o => {
    const byStatus = statusFilter === 'all' || (o.status || 'processing') === statusFilter;
    const byPayment = paymentFilter === 'all' || (o.payment_status || 'pending') === paymentFilter;
    return byStatus && byPayment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const previous = orders;
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
      setOrders(previous);
    }
  };

  const updatePaymentStatus = async (orderId, newStatus) => {
    const previous = orders;
    setOrders(orders.map(o => o.id === orderId ? { ...o, payment_status: newStatus } : o));
    try {
      await orderService.updatePaymentStatus(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update payment status:', err);
      setOrders(previous);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const getOrderItemImage = (item, orderItems = []) => {
    let img = item.product_image || item.image || item.image_url || item.thumbnail_url;
    if (!img && Array.isArray(item.images) && item.images.length > 0) {
      img = typeof item.images[0] === 'string' ? item.images[0] : (item.images[0]?.url || item.images[0]?.path);
    }
    if (!img && item.products?.images) {
      img = Array.isArray(item.products.images) ? item.products.images[0] : item.products.images;
    }
    if (!img && Array.isArray(orderItems)) {
      const match = orderItems.find(i => 
        (i.product_id === item.product_id || (i.product_name && i.product_name === item.product_name)) && 
        (i.product_image || i.image || i.image_url)
      );
      if (match) {
        img = match.product_image || match.image || match.image_url;
      }
    }
    if (!img) return null;
    const strImg = String(img);
    if (strImg.startsWith('http') || strImg.includes('/storage/v1/object/public/')) {
      return strImg;
    }
    return fileService.getPublicUrl('product-images', strImg);
  };

  return (
    <div className="container mx-auto px-4 py-8 print:p-0 print:m-0">
      {/* CSS Print Rules: Ensures ONLY the invoice is printed on 1 page */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            margin: 0;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
        }
      `}</style>

      {/* Main Page UI (Hidden during print) */}
      <div className="print:hidden">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
          <p className="text-gray-600">{filteredOrders.length} orders found</p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-sm text-gray-600">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            </div>
          ) : filteredOrders.map(order => (
            <div key={order.id} className="card p-6 bg-white shadow-sm rounded-xl border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Order #{order.order_number || order.id}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {order.created_at ? new Date(order.created_at).toLocaleString() : ''} • ₹{Number(order.total_amount || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status || 'processing'}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status || 'processing')} border-none cursor-pointer`}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select
                    value={order.payment_status || 'pending'}
                    onChange={(e) => updatePaymentStatus(order.id, e.target.value)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border-none cursor-pointer"
                  >
                    <option value="pending">Payment Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Shipping Address</h4>
                <p className="text-sm text-gray-700">
                  {order.shipping_address?.address}, {order.shipping_address?.city}<br />
                  {order.shipping_address?.state} {order.shipping_address?.zipCode}, {order.shipping_address?.country}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
                >
                  <FiEye size={18} />
                  View Details
                </button>
                <button
                  onClick={() => setInvoiceOrder(order)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium text-sm transition-colors"
                >
                  <FiPrinter size={18} />
                  Generate Invoice
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && !loading && (
          <div className="card p-12 text-center bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal with Backdrop Blur */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6 overflow-y-auto print:hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative my-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Details</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-gray-700 space-y-1">
              <p><strong>Order ID:</strong> #{selectedOrder.order_number || selectedOrder.id}</p>
              <p><strong>Date:</strong> {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString() : 'N/A'}</p>
              <p><strong>Total Amount:</strong> ₹{Number(selectedOrder.total_amount || 0).toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-900">Items Purchased</h3>
              <div className="space-y-3">
                {(selectedOrder.order_items || []).map((item, idx) => {
                  const name = item.product_name || item.products?.name || 'Product Item';
                  const qty = Number(item.quantity || 1);
                  const unitPrice = Number(item.unit_price ?? item.price ?? 0);
                  const totalPrice = Number(item.total_price ?? (unitPrice * qty));
                  const imgSrc = getOrderItemImage(item, selectedOrder.order_items);

                  return (
                    <div key={item.id || idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={name}
                          className="w-16 h-16 object-cover rounded-md bg-white border border-gray-200"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-xs text-center p-1"
                        style={{ display: imgSrc ? 'none' : 'flex' }}
                      >
                        No Image
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{name}</p>
                        <p className="text-xs text-gray-600">Quantity: {qty}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{unitPrice.toFixed(2)}{' '}
                          {qty > 1 && (
                            <span className="text-xs text-gray-500 font-normal">
                              (Total: ₹{totalPrice.toFixed(2)})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Shipping Information</h3>
              <p className="text-sm text-gray-700">
                {selectedOrder.shipping_address?.address}, {selectedOrder.shipping_address?.city}<br />
                {selectedOrder.shipping_address?.state} {selectedOrder.shipping_address?.zipCode}, {selectedOrder.shipping_address?.country}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Single-Page Invoice Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-md p-4 sm:p-6 overflow-y-auto print:p-0 print:bg-white">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative my-auto print:p-0 print:shadow-none print:w-full print:max-w-none print:m-0">
            {/* Modal Top Actions (Hidden when printing) */}
            <div className="flex justify-between items-center mb-4 print:hidden border-b pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Tax Invoice Preview</h2>
                <p className="text-xs text-gray-500">Order #{invoiceOrder.order_number || invoiceOrder.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintInvoice}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
                >
                  <FiPrinter size={18} /> Print / Save PDF
                </button>
                <button
                  onClick={() => setInvoiceOrder(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Printable Invoice Target Box */}
            <div id="printable-invoice" className="bg-white p-4 print:p-0">
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-4">
                <div>
                  <h1 className="text-2xl font-black text-blue-900 tracking-tight">CATALIXO GLOBAL</h1>
                  <p className="text-xs font-semibold text-gray-600">Official E-Commerce Store</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">
                    123 Commerce Avenue, Business Tech Park<br />
                    New Delhi, India - 110001<br />
                    <strong>Email:</strong> support@catalixo.com | <strong>Ph:</strong> +91 98765 43210<br />
                    <strong>GSTIN:</strong> 07AAAAA0000A1Z5
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-blue-900 text-white font-bold text-xs px-3 py-1 rounded mb-2 tracking-wider">
                    TAX INVOICE
                  </div>
                  <p className="text-xs text-gray-700">
                    <strong>Invoice #:</strong> INV-{invoiceOrder.order_number || invoiceOrder.id}
                  </p>
                  <p className="text-xs text-gray-700">
                    <strong>Date:</strong> {invoiceOrder.created_at ? new Date(invoiceOrder.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-700">
                    <strong>Payment Method:</strong> {(invoiceOrder.payment_method || 'COD').toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Billed To / Shipping Address Details */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4 text-xs">
                <div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-1">Billed & Shipped To:</h3>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">
                    {invoiceOrder.shipping_address?.name || 'Valued Customer'}
                  </p>
                  <p className="text-gray-700 leading-tight">
                    {invoiceOrder.shipping_address?.address}<br />
                    {invoiceOrder.shipping_address?.city}, {invoiceOrder.shipping_address?.state} {invoiceOrder.shipping_address?.zipCode}<br />
                    {invoiceOrder.shipping_address?.country || 'India'}
                  </p>
                  {(invoiceOrder.shipping_address?.phone || invoiceOrder.shipping_address?.email) && (
                    <p className="text-gray-600 mt-1">
                      {invoiceOrder.shipping_address?.phone && <span><strong>Ph:</strong> {invoiceOrder.shipping_address.phone} </span>}
                      {invoiceOrder.shipping_address?.email && <span>| <strong>Email:</strong> {invoiceOrder.shipping_address.email}</span>}
                    </p>
                  )}
                </div>
                <div className="text-right flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-1">Status & Reference</h3>
                    <p className="text-gray-700">
                      <strong>Order Status:</strong>{' '}
                      <span className="capitalize font-semibold text-blue-800">{invoiceOrder.status || 'Processing'}</span>
                    </p>
                    <p className="text-gray-700">
                      <strong>Payment Status:</strong>{' '}
                      <span className="uppercase font-semibold text-green-700">{invoiceOrder.payment_status || 'Paid'}</span>
                    </p>
                    {invoiceOrder.payment_id && (
                      <p className="text-gray-600 text-[10px] mt-1">
                        <strong>Transaction ID:</strong> {invoiceOrder.payment_id}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse text-xs mb-4 border border-gray-300">
                <thead>
                  <tr className="bg-gray-800 text-white uppercase text-[11px]">
                    <th className="py-2 px-3 border border-gray-700 text-center w-12">#</th>
                    <th className="py-2 px-3 border border-gray-700">Item Description</th>
                    <th className="py-2 px-3 border border-gray-700 text-center w-16">Qty</th>
                    <th className="py-2 px-3 border border-gray-700 text-right w-24">Unit Price</th>
                    <th className="py-2 px-3 border border-gray-700 text-right w-28">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(invoiceOrder.order_items || []).length > 0 ? (
                    (invoiceOrder.order_items || []).map((item, idx) => {
                      const name = item.product_name || item.products?.name || 'Product Item';
                      const qty = Number(item.quantity || 1);
                      const unitPrice = Number(item.unit_price ?? item.price ?? 0);
                      const totalPrice = Number(item.total_price ?? (unitPrice * qty));
                      return (
                        <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-3 border border-gray-300 text-center font-medium text-gray-600">{idx + 1}</td>
                          <td className="py-2 px-3 border border-gray-300 font-medium text-gray-900">{name}</td>
                          <td className="py-2 px-3 border border-gray-300 text-center text-gray-800">{qty}</td>
                          <td className="py-2 px-3 border border-gray-300 text-right text-gray-800">₹{unitPrice.toFixed(2)}</td>
                          <td className="py-2 px-3 border border-gray-300 text-right font-semibold text-gray-900">₹{totalPrice.toFixed(2)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-gray-500 border border-gray-300">
                        No items found for this order
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Invoice Summary & Terms */}
              <div className="flex justify-between items-start text-xs border-t border-gray-300 pt-3">
                <div className="w-1/2 text-gray-600 space-y-1">
                  <p className="font-bold text-gray-800">Terms & Conditions:</p>
                  <p className="text-[11px] leading-tight">1. All prices are inclusive of GST (where applicable).</p>
                  <p className="text-[11px] leading-tight">2. Warranty claims are handled as per standard manufacturer policies.</p>
                  <p className="text-[11px] leading-tight">3. This is a computer-generated tax invoice and requires no signature.</p>
                </div>
                <div className="w-5/12 bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1.5">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{Number(invoiceOrder.subtotal || invoiceOrder.total_amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Fee:</span>
                    <span>{Number(invoiceOrder.shipping_cost || 0) === 0 ? 'FREE' : `₹${Number(invoiceOrder.shipping_cost).toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST / Tax (18% Incl.):</span>
                    <span>₹{Number(invoiceOrder.tax_amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-300 pt-2">
                    <span>Grand Total:</span>
                    <span className="text-blue-900">₹{Number(invoiceOrder.total_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Signatory Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end text-xs">
                <div>
                  <p className="text-gray-500 italic">Thank you for shopping with CATALIXO GLOBAL!</p>
                </div>
                <div className="text-center">
                  <div className="h-10 flex items-center justify-center font-serif text-blue-900 font-bold italic text-base opacity-75">
                    Catalixo Global
                  </div>
                  <div className="border-t border-gray-400 pt-1 px-4 font-semibold text-gray-700">
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;