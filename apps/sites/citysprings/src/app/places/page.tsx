import Link from "next/link";
import { fetchAllPlaces } from "../../../../../../libs/api/fetchAllPlaces";
const PlacesPage = async () => {
  const places = await fetchAllPlaces();

  if (!places.length) {
    return <div>No places found.</div>;
  }
  console.log("🏞️ Places Found:", places);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Places</h1>
      <ul className="space-y-4 flex flex-wrap gap-4">
        {places.map((place: any) => {
          const alias = place.path?.alias || `/node/${place.id}`; // Use alias if available, fallback to node path

          // Ensure paths without /places/ are prefixed properly
          const formattedPath = alias.startsWith("/places/") ? alias : `/places${alias}`;

          return (
            <li key={place.id} className="p-4 border rounded-lg shadow-sm">
              <Link
                href={formattedPath} // Ensure correct path format
                data-place-id={place.id}
                className="block"
              >
                {place.field_image?.links?.max_1600_16_9?.href && (
                  <img
                    src={place.field_image.links.max_1600_16_9.href}
                    alt={place.field_image.resourceIdObjMeta.alt}
                    className="mb-2 rounded-lg w-50 h-auto"
                  />
                )}
                <h2 className="text-2xl font-semibold">{place.title}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlacesPage;
