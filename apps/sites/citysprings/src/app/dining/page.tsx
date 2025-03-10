// import { fetchFromDrupal } from '../../../../../../libs/api/fetchFromDrupal';

// export default async function DiningPage() {
//   let restaurants = [];

//   try {
//     const data = await fetchFromDrupal({ endpoint: 'node/dining' });
//     console.log('data:', data); 
//     restaurants = data.data.map((item: any) => ({
//       title: item.attributes.title,
//       slug: item.attributes.path.alias,
//       imageDesktop: item.relationships.field_image.data.meta.imageDerivatives.links.max_1600_16_9.href,
//       imageMobile: item.relationships.field_image.data.meta.imageDerivatives.links.max_1600_10_7.href,

//     }));
//   } catch (error) {
//     console.error('Error fetching restaurants:', error);
//   }

//   console.log('restaurants:', restaurants);

//   return (
//     <div>
//       <h1>Dining Options</h1>
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.slug}>
//             <a href={`${restaurant.slug}`}>{restaurant.title}
//                 <img src={restaurant.imageDesktop} alt={restaurant.title} />
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { fetchFromDrupal } from '../../../../../../libs/api/fetchFromDrupal';

interface Restaurant {
  title: string;
  slug: string;
  imageDesktop: string;
  imageMobile: string;
}

export default async function DiningPage() {
  let restaurants: Restaurant[] = [];

  try {
    // Add the filter for the taxonomy term ID 141 (destination filter)
    const data = await fetchFromDrupal({
      endpoint: 'node/dining',
      filter: {
        'field_destination.meta.drupal_internal__target_id': 141,
      },
    });

    console.log('data:', data);

    // Map the data into the restaurant objects
    if (data && data.data) {
      restaurants = data.data.map((item: any) => ({
        title: item.attributes.title,
        slug: item.attributes.path.alias,
        imageDesktop: item.relationships.field_image.data.meta.imageDerivatives.links.max_1600_16_9.href,
        imageMobile: item.relationships.field_image.data.meta.imageDerivatives.links.max_1600_10_7.href,
      }));
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }

  console.log('restaurants:', restaurants);

  return (
    <div>
      <h1>Dining Options</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.slug}>
            <a href={`${restaurant.slug}`}>
              {restaurant.title}
              <img src={restaurant.imageDesktop} alt={restaurant.title} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
