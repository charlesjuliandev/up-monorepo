import { drupal } from "./next-drupal";

const fetchEventBySlug = async (slug: string) => {
  try {
    // Step 1: Fetch alias to get node path
    const aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
      params: {
        "filter[alias]": `/events/${slug}`,
      },
    });

    console.log("Alias Response:", aliasResponse);

    if (!aliasResponse || aliasResponse.length === 0) {
      throw new Error("Alias not found");
    }

    // Step 2: Extract numeric node ID from alias
    const path = aliasResponse[0].path; 
    const numericId = path.split("/").pop(); // Extract "4463" from "/node/4463"

    if (!numericId) {
      throw new Error("Numeric Node ID not found in path alias response");
    }

    console.log("Extracted Numeric Node ID:", numericId);

    // Step 3: Fetch the event directly using the numeric ID (includes UUID & data)
    const nodeLookupResponse = await drupal.getResourceCollection("node--event", {
      params: {
        "filter[drupal_internal__nid]": numericId,
        "include": "field_image", // Include related image data
      },
    });

    if (!nodeLookupResponse || nodeLookupResponse.length === 0) {
      throw new Error("Event not found");
    }

    const event = nodeLookupResponse[0]; // The first (and only) event match

    console.log("Event Data:", event);

    // Step 4: Return the extracted event data
    let startDate = new Date(event.field_date?.value).toLocaleDateString()
    let endDate = new Date(event.field_date?.end_value).toLocaleDateString()
    return {
      title: event.title,
      startDate: startDate ?? "No date available",
      endDate: endDate ?? "No date available",
      description: event.body?.processed ?? "No description available",
      image:
        event?.field_image?.links?.max_1600_16_9
          ?.href ?? "",
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

export { fetchEventBySlug };
