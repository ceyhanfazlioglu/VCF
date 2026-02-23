// Convert Turkish characters to English for URL-friendly format
export const turkishToEnglish = (text) => {
    if (!text) return '';
    
    return text
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, ''); // Remove any other special characters
  };
  
  // Get gender path for URL (k → kadin, e → erkek)
  export const getGenderPath = (gender) => {
    return gender === 'k' ? 'kadin' : 'erkek';
  };
  
  // Build complete category URL
  export const buildCategoryUrl = (category) => {
    if (!category) return '/shop';
    
    const gender = getGenderPath(category.gender);
    const name = turkishToEnglish(category.title);
    return `/shop/${gender}/${name}/${category.id}`;
  };
  
  // Get top N categories by rating
  export const getTopCategories = (categories, count = 5) => {
    if (!categories || categories.length === 0) return [];
    
    return [...categories]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, Math.min(count, categories.length));
  };
  
  // Group categories by gender
  export const groupCategoriesByGender = (categories) => {
    if (!categories || categories.length === 0) {
      return { kadin: [], erkek: [] };
    }
    
    return {
      kadin: categories.filter(c => c.gender === 'k'),
      erkek: categories.filter(c => c.gender === 'e')
    };
  };