import {fetchFromDrupal} from './fetchFromDrupal';

export const fetchEventById = async (id: string) => {
  const url = `node/event/${id}`;

  try {
    const response = await fetchFromDrupal({ endpoint: url });

    if (!response || !response.data || response.data.length === 0) {
      return null;
    }
    console.log("response", response)

    return response.data; // Return the first matching event
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    return null;
  }
};
