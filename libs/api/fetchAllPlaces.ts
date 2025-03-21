import { drupal } from "./next-drupal";

export const fetchAllPlaces = async () => {
    try {
      const response = await drupal.getResourceCollection("node--place", {
        params: {
          "include": "field_image", // Include image data
          "filter[field_destination.meta.drupal_internal__target_id]": 141, // Filter by correct site destination
        },
      });
  
      return response || [];
    } catch (error) {
      console.error("❌ Error fetching places:", error);
      return [];
    }
  };
