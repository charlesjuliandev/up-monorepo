// import { fetchFromDrupal } from './fetchFromDrupal';

// export const fetchUpcomingEvents = async () => {
//   const currentDate = new Date();
//   const currentDateString = currentDate.toISOString(); // ISO format for current date

//   // Page limit and offset for pagination
//   const pageLimit = 50;
//   let offset = 0;

//   // Construct the URL with the correct filtering
//   // Use a valid operator for the date range, such as `>` for 'greater than'
//   let url = `node/event?filter[field_date.end_value][value]=${currentDateString}&filter[field_date.end_value][operator]=%3E&sort[sort-end][path]=field_date.end_value&sort[sort-end][direction]=ASC`;

//   const events = [];

//   // Loop to handle pagination
//   while (url) {
//     console.log(`Fetching events from: ${url}`);

//     try {
//       const response = await fetchFromDrupal({ endpoint: url });

//       // Log the full response to inspect its structure
//       console.log('API Response:', response);

//       if (!response || !response.data) {
//         console.error('No response data from Drupal');
//         break;
//       }

//       // Add the fetched events to the array
//       events.push(...response.data);

//       // Check if the response includes a 'next' pagination link
//       if (response.links?.next?.href) {
//         // Set the next URL for pagination
//         url = response.links.next.href.replace(`${process.env.BASE_URL}${process.env.API_BASE}/`, '');
//       } else {
//         // If no 'next' link, exit the loop as all data is fetched
//         url = '';  // End loop
//       }
//     } catch (error) {
//       console.error('Error fetching upcoming events:', error);
//       break;
//     }
//   }

//   // Return the fetched events
//   return events;
// };

import { fetchFromDrupal } from './fetchFromDrupal';

export const fetchUpcomingEvents = async () => {
  const currentDate = new Date().toISOString(); // ISO format for current date

  // Base URL with filters for upcoming events, including destination (taxonomy term ID 141)
  let url = `node/event?filter[field_date.end_value][value]=${currentDate}&filter[field_date.end_value][operator]=%3E&filter[field_destination.meta.drupal_internal__target_id][value]=141&sort[sort-end][path]=field_date.end_value&sort[sort-end][direction]=ASC`;

  const events = [];

  // Loop to handle pagination
  while (url) {
    console.log(`Fetching events from: ${url}`);

    try {
      const response = await fetchFromDrupal({ endpoint: url });

      console.log('API Response:', response);

      if (!response || !response.data) {
        console.error('No response data from Drupal');
        break;
      }

      events.push(...response.data);

      // Handle pagination
      if (response.links?.next?.href) {
        url = response.links.next.href.replace(`${process.env.BASE_URL}${process.env.API_BASE}/`, '');
      } else {
        url = ''; // End loop
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      break;
    }
  }

  return events;
};
