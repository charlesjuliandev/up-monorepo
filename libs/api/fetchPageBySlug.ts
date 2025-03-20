import { drupal } from "./next-drupal";

export const fetchPageBySlug = async (slug: string) => {
  try {
    console.log(`🔍 Fetching page by slug: ${slug}`);

    // Step 1: Find the alias for this page
    const aliasResponse = await drupal.getResourceCollection("path_alias--path_alias", {
      params: { "filter[alias]": `/${slug}` },
    });

    if (!aliasResponse || aliasResponse.length === 0) {
      return null;
    }

    // Step 2: Extract node ID from alias response
    const path = aliasResponse[0].path; // Example: "/node/1234"
    const numericId = path.split("/").pop();

    if (!numericId) {
      return null;
    }

    console.log("Extracted Numeric Node ID:", numericId);

    // Step 3: Fetch the actual "page" content
    const pageResponse = await drupal.getResourceCollection("node--page", {
      params: { "filter[drupal_internal__nid]": numericId },
    });

    if (!pageResponse || pageResponse.length === 0) {
      return null;
    }

    const page = pageResponse[0];

    return {
      title: page.title,
      body: page.body?.processed ?? "",
    };
  } catch (error) {
    console.error("❌ Error fetching page:", error);
    return null;
  }
};
