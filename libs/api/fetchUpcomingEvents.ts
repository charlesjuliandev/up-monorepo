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
