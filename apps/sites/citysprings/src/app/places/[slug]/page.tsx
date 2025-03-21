import { fetchPlaceBySlug } from "../../../../../../../libs/api/fetchPlaceBySlug";

const PlacePage = async ({ params }: { params: { slug: string } }) => {
  const place = await fetchPlaceBySlug(params.slug);

  console.log("place", place);

  if (!place) {
    return <div>Place not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{place.title}</h1>
      {place.image && <img src={place.image} alt={place.title} className="mt-4 rounded-lg" />}
      <div dangerouslySetInnerHTML={{ __html: place.description }} />
    </div>
  );
};

export default PlacePage;
