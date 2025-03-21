import { drupal } from "./next-drupal";

// export const fetchPlaceBySlug = async (slug: string) => {
//   try {
//     console.log(`🔍 Resolving alias for slug: ${slug}`);

//     if (!slug) {
//       console.error("❌ Slug is undefined or empty.");
//       return null;
//     }

//     // 🔍 Possible alias formats to check
//     const possiblePaths = [
//       `/places/${slug}`,   // Example: /places/heritage
//       `/${slug}`,          // Example: /heritage
//     ];

//     // If the slug contains multiple parts, generate additional possible paths
//     const slugParts = slug.split("/");
//     if (slugParts.length > 1) {
//       possiblePaths.push(`/${slugParts.slice(0, -1).join("/")}/${slugParts.slice(-1)}`);
//     }

//     console.log("🔎 Checking possible aliases:", possiblePaths);

//     let nodeId = null;
//     for (const path of possiblePaths) {
//       const aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
//         params: { "filter[alias]": path },
//       });

//       if (aliasResponse.length > 0) {
//         const nodePath = aliasResponse[0].path; // Example: "/node/1234"
//         const nodeIdMatch = nodePath.match(/\/node\/(\d+)/);
//         if (nodeIdMatch) {
//           nodeId = nodeIdMatch[1];
//           console.log(`✅ Found alias: ${path} → Node ID: ${nodeId}`);
//           break;
//         }
//       }
//     }

//     if (!nodeId) {
//       console.error(`❌ No alias found for: ${slug}`);
//       return null;
//     }

//     // Step 2: Fetch place data using `filter[drupal_internal__nid]`
//     const placeResponse = await drupal.getResourceCollection("node--place", {
//       params: {
//         "filter[drupal_internal__nid]": nodeId,
//         "include": "field_image",
//       },
//     });

//     if (!placeResponse || placeResponse.length === 0) {
//       console.error(`❌ Place with Node ID ${nodeId} not found.`);
//       return null;
//     }

//     const place = placeResponse[0];

//     console.log("🎉 Place Data Found:", place);

//     return {
//       title: place.title,
//       description: place.body?.processed ?? "No description available",
//       image: place?.field_image?.links?.max_1600_16_9?.href ?? "",
//     };
//   } catch (error) {
//     console.error("❌ Error fetching place:", error);
//     return null;
//   }
// };

export const fetchPlaceBySlug = async (slug: string) => {
  try {
    console.log(`🔍 Fetching place by slug: ${slug}`);

    if (!slug) {
      console.error("❌ Slug is undefined or empty.");
      return null;
    }

    // Step 1: Try fetching place data directly using `filter[title]`
    console.log(`🔎 Attempting to fetch place using title filter: ${slug}`);
    const titleResponse = await drupal.getResourceCollection("node--place", {
      params: {
        "filter[title]": slug,
        "include": "field_image",
      },
    });

    if (titleResponse.length > 0) {
      console.log("✅ Place found using title filter.");
      return formatPlaceResponse(titleResponse[0]);
    }

    console.log("⚠️ No place found using title filter. Trying alias resolution...");

    // Step 2: Resolve alias to find the node ID
    const possiblePaths = [`/places/${slug}`, `/${slug}`];

    const slugParts = slug.split("/");
    if (slugParts.length > 1) {
      possiblePaths.push(`/${slugParts.slice(0, -1).join("/")}/${slugParts.slice(-1)}`);
    }

    console.log("🔎 Checking possible aliases:", possiblePaths);

    let nodeId = null;
    for (const path of possiblePaths) {
      const aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
        params: { "filter[alias]": path },
      });

      if (aliasResponse.length > 0) {
        const nodePath = aliasResponse[0].path;
        const nodeIdMatch = nodePath.match(/\/node\/(\d+)/);
        if (nodeIdMatch) {
          nodeId = nodeIdMatch[1];
          console.log(`✅ Found alias: ${path} → Node ID: ${nodeId}`);
          break;
        }
      }
    }

    if (!nodeId) {
      console.error(`❌ No alias found for: ${slug}`);
      return null;
    }

    // Step 3: Fetch place data using `filter[drupal_internal__nid]`
    console.log(`🔎 Fetching place data using Node ID: ${nodeId}`);
    const placeResponse = await drupal.getResourceCollection("node--place", {
      params: {
        "filter[drupal_internal__nid]": nodeId,
        "include": "field_image",
      },
    });

    if (!placeResponse || placeResponse.length === 0) {
      console.error(`❌ Place with Node ID ${nodeId} not found.`);
      return null;
    }

    return formatPlaceResponse(placeResponse[0]);
  } catch (error) {
    console.error("❌ Error fetching place:", error);
    return null;
  }
};

// Helper function to format the place response
const formatPlaceResponse = (place) => ({
  title: place.title,
  description: place.body?.processed ?? "No description available",
  image: place?.field_image?.links?.max_1600_16_9?.href ?? "",
});
