import { fetchDiningBySlug } from '../../../../../../../libs/api/fetchDiningBySlug';

interface DiningPageProps {
  params: {
    slug: string;
  };
}

const DiningPage = async ({ params }: DiningPageProps) => {
  const { slug } = params;

  const restaurant = await fetchDiningBySlug(slug);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div>
      <h1>{restaurant.title}</h1>
      {restaurant.relationships?.field_image?.data?.meta?.imageDerivatives?.links?.max_1600_10_7?.href && (
        <img
          src={restaurant.relationships.field_image.data.meta.imageDerivatives.links.max_1600_10_7.href}
          alt={restaurant.relationships.field_image.data.meta.alt}
          width={1600}
          height={900}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: restaurant.body.processed }} />
    </div>
  );
};

export default DiningPage;
