import { drupal } from "./next-drupal";

const fetchEventBySlug = async (slug: string) => {
  try {
    let aliasResponse;
    aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
      params: { "filter[alias]": `/events/${slug}` },
    }).catch(() => null); 

    // if path alias not found with /events/ try without it
    // some creaters may have changed the URL alias and not include event
    if (!aliasResponse || aliasResponse.length === 0) {
      aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
        params: { "filter[alias]": `/${slug}` },
      }).catch(() => null);
    }

    if (!aliasResponse || aliasResponse.length === 0) {
      throw new Error(`Alias not found for slug: ${slug}`);
    }

    const path = aliasResponse[0].path; // Use path directly as it's not under `attributes`
    const pathParts = path.split("/");

    if (pathParts.length < 3 || pathParts[1] !== "node") {
      throw new Error("Alias does not map to a valid node path");
    }

    const numericId = pathParts[2]; // Extract ID from "/node/3958"

    const nodeLookupResponse = await drupal.getResourceCollection("node--event", {
      params: {
        "filter[drupal_internal__nid]": numericId,
        "include": "field_image",
      },
    });

    if (!nodeLookupResponse || nodeLookupResponse.length === 0) {
      throw new Error("Event not found");
    }

    const event = nodeLookupResponse[0];

    let startDate = event.field_date?.value
      ? new Date(event.field_date.value).toLocaleDateString()
      : "No date available";
    let endDate = event.field_date?.end_value
      ? new Date(event.field_date.end_value).toLocaleDateString()
      : "No date available";

    return {
      title: event.title,
      startDate,
      endDate,
      description: event.body?.processed ?? "No description available",
      image: event.field_image?.links?.max_1600_16_9?.href ?? "",
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};

export { fetchEventBySlug };
