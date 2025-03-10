import { fetchUpcomingEvents } from '../../../../../../libs/api/fetchUpcomingEvents';

const EventsPage = async () => {
  const events = await fetchUpcomingEvents();

  if (!events.length) {
    return <div>No upcoming events found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map((event: any) => {
            console.log("event:", event);
            return (
          <li key={event.id} className="p-4 border rounded-lg shadow-sm">
            <a href={event.attributes.path.alias}>
            <h2 className="text-2xl font-semibold">{event.attributes.title}</h2>
            <div className='flex flex-row'>
            {event.attributes.field_date?.value && (
              <p className="text-gray-600">
               {new Date(event.attributes.field_date.value).toLocaleDateString()} - 
              </p>
            )}
            {event.attributes.field_date?.end_value && (
              <p className="text-gray-600">
               <span>&nbsp;</span>{new Date(event.attributes.field_date.end_value).toLocaleDateString()}
              </p>
            )}
            </div>
            {/* {event.attributes.body?.processed && (
              <div
                className="mt-2 text-gray-800"
                dangerouslySetInnerHTML={{ __html: event.attributes.body.processed }}
              />
            )} */}
            </a>
          </li>
        )})}
      </ul>
    </div>
  );
};

export default EventsPage;
