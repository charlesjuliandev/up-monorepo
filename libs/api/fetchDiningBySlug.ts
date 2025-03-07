import {fetchFromDrupal} from './fetchFromDrupal';

export const fetchDiningBySlug = async (slug: string) => {
  try {
    // Fetch all dining nodes from Drupal
    const response = await fetchFromDrupal({ endpoint: 'node/dining' });

    if (!response || !response.data) {
      throw new Error('No data received from Drupal');
    }

    // Find the dining node that matches the slug
    const restaurantData = response.data.find(
      (item: any) => item.attributes.path.alias.split('/')[2] === slug
    );

    if (!restaurantData) {
      return null; // Return null if restaurant is not found
    }

    return restaurantData.attributes;
  } catch (error) {
    console.error('Error fetching dining data:', error);
    return null;
  }
};
