// Brand sort order: KlenShine -> Japotup -> Bonheur
const BRAND_ORDER = {
  'klenshine': 1,
  'japotup': 2,
  'bonheur': 3
};

/**
 * Sorts brands in the order: KlenShine -> Japotup -> Bonheur
 * Brands not in this list will appear after in their original order
 */
export const sortBrands = (brands) => {
  if (!brands || !Array.isArray(brands)) return brands || [];

  return [...brands].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase().trim();
    const nameB = (b.name || '').toLowerCase().trim();
    
    // Check if names contain brand keywords
    const getBrandOrder = (name) => {
      if (name.includes('klenshine') || name.includes('klen')) return BRAND_ORDER['klenshine'];
      if (name.includes('japotup') || name.includes('japot')) return BRAND_ORDER['japotup'];
      if (name.includes('bonheur')) return BRAND_ORDER['bonheur'];
      return 999; // Other brands go to the end
    };

    const orderA = getBrandOrder(nameA);
    const orderB = getBrandOrder(nameB);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // If same order, maintain original order or sort by name
    return nameA.localeCompare(nameB);
  });
};

