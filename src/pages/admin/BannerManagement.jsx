import { useState, useEffect } from 'react';
import { bannerService, fileService } from '../../services/supabaseService';
import { FiPlus, FiEdit, FiTrash2, FiImage, FiEye, FiEyeOff, FiArrowUp, FiArrowDown, FiX } from 'react-icons/fi';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    mobile_image_url: '',
    link_url: '',
    link_text: 'Shop Now',
    position: 0,
    is_active: true,
    start_date: '',
    end_date: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await bannerService.getBanners();
      if (error) {
        console.error('Error loading banners:', error);
        setError(`Error loading banners: ${error.message || 'Unknown error'}`);
        setBanners([]);
        return;
      }
      setBanners(data || []);
    } catch (error) {
      console.error('Error loading banners:', error);
      setError(`Error loading banners: ${error.message || 'Unknown error'}`);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image_url) {
      alert('Please upload a desktop image.');
      return;
    }

    setUploading(true);

    try {
      // Calculate position for new banners
      let position = formData.position !== undefined && formData.position !== '' ? parseInt(formData.position) : null;
      if (!editingBanner && position === null) {
        // For new banners, set position to max position + 1
        const maxPosition = banners.length > 0 
          ? Math.max(...banners.map(b => b.position || 0))
          : -1;
        position = maxPosition + 1;
      }
      
      // Clean and format the data
      const cleanedData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || null,
        description: formData.description?.trim() || null,
        image_url: formData.image_url.trim(),
        mobile_image_url: formData.mobile_image_url?.trim() || null,
        link_url: formData.link_url?.trim() || null,
        link_text: (formData.link_text?.trim() || 'Shop Now'),
        position: position !== null ? position : (editingBanner ? formData.position : 0),
        is_active: formData.is_active !== undefined ? formData.is_active : true,
        start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null
      };
      
      // Add updated_at only for updates
      if (editingBanner) {
        cleanedData.updated_at = new Date().toISOString();
      }
      
      console.log('Saving banner with data:', cleanedData);

      let result;
      if (editingBanner) {
        // Remove created_at from update
        delete cleanedData.created_at;
        result = await bannerService.updateBanner(editingBanner.id, cleanedData);
      } else {
        // Remove updated_at from new creates (let database handle timestamps)
        delete cleanedData.updated_at;
        result = await bannerService.createBanner(cleanedData);
      }

      if (result.error) {
        console.error('Error saving banner:', result.error);
        setError(`Error saving banner: ${result.error.message || 'Unknown error'}`);
        alert(`Error saving banner: ${result.error.message || 'Unknown error'}`);
        return;
      }
      
      setError(null);

      setShowModal(false);
      setEditingBanner(null);
      resetForm();
      await loadBanners();
      alert(editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
    } catch (error) {
      console.error('Error saving banner:', error);
      alert(`Error saving banner: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      image_url: banner.image_url || '',
      mobile_image_url: banner.mobile_image_url || '',
      link_url: banner.link_url || '',
      link_text: banner.link_text || 'Shop Now',
      position: banner.position || 0,
      is_active: banner.is_active,
      start_date: banner.start_date ? banner.start_date.split('T')[0] : '',
      end_date: banner.end_date ? banner.end_date.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await bannerService.deleteBanner(id);
        loadBanners();
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      await bannerService.updateBanner(banner.id, { is_active: !banner.is_active });
      loadBanners();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  const handleReorder = async (bannerId, direction) => {
    const currentIndex = banners.findIndex(b => b.id === bannerId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= banners.length) return;

    const newBanners = [...banners];
    [newBanners[currentIndex], newBanners[newIndex]] = [newBanners[newIndex], newBanners[currentIndex]];
    
    setBanners(newBanners);

    try {
      const bannerIds = newBanners.map(b => b.id);
      await bannerService.reorderBanners(bannerIds);
    } catch (error) {
      console.error('Error reordering banners:', error);
      loadBanners(); // Revert on error
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      mobile_image_url: '',
      link_url: '',
      link_text: 'Shop Now',
      position: 0,
      is_active: true,
      start_date: '',
      end_date: ''
    });
  };

  const handleImageUpload = async (file, type = 'desktop') => {
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `banner-${Date.now()}-${type}.${file.name.split('.').pop()}`;
      const { data, error } = await fileService.uploadFile('banner-images', file, fileName);
      
      if (error) {
        console.error('Error uploading image:', error);
        alert(`Error uploading image: ${error.message || 'Unknown error'}`);
        return;
      }
      
      const publicUrl = fileService.getPublicUrl('banner-images', data.path);
      
      if (type === 'desktop') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, mobile_image_url: publicUrl }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600">Manage homepage banner carousel</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingBanner(null);
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus size={20} />
          Add Banner
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Banners List */}
      <div className="bg-white rounded-lg shadow">
        {banners.length === 0 ? (
          <div className="p-12 text-center">
            <FiImage size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No banners yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first banner</p>
            <button
              onClick={() => {
                resetForm();
                setEditingBanner(null);
                setShowModal(true);
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiPlus size={20} />
              Add Your First Banner
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner, index) => (
                <tr key={banner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-16 w-24">
                      <img
                        className="h-16 w-24 object-cover rounded"
                        src={banner.image_url}
                        alt={banner.title}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                      {banner.subtitle && (
                        <div className="text-sm text-gray-500">{banner.subtitle}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {banner.link_url ? (
                      <a
                        href={banner.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-900 text-sm"
                      >
                        {banner.link_text}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No link</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(banner)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        banner.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {banner.is_active ? <FiEye size={12} className="mr-1" /> : <FiEyeOff size={12} className="mr-1" />}
                      {banner.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReorder(banner.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <FiArrowUp size={16} />
                      </button>
                      <span className="text-sm text-gray-900">{banner.position}</span>
                      <button
                        onClick={() => handleReorder(banner.id, 'down')}
                        disabled={index === banners.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <FiArrowDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Desktop Image *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'desktop')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="mt-2 h-20 w-32 object-cover rounded" />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'mobile')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {formData.mobile_image_url && (
                      <img src={formData.mobile_image_url} alt="Preview" className="mt-2 h-20 w-32 object-cover rounded" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link URL
                    </label>
                    <input
                      type="url"
                      value={formData.link_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link Text
                    </label>
                    <input
                      type="text"
                      value={formData.link_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, link_text: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="number"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : editingBanner ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
