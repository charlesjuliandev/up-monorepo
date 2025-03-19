import Link from "next/link";
import { fetchUpcomingEvents } from "../../../../../../libs/api/fetchUpcomingEvents";

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
          let alias = event.attributes.path?.alias || `/node/${event.id}`; // Use alias if available, fallback to node path

          // Ensure alias has "/events/" if missing
          if (!alias.startsWith("/events/")) {
            alias = `/events${alias}`;
          }

          console.log("Resolved alias:", alias);

          return (
            <li key={event.id} className="p-4 border rounded-lg shadow-sm">
              <Link href={alias} data-event-id={event.id} className="block">
                {event.relationships.field_image?.data?.meta?.imageDerivatives?.links?.max_1600_16_9?.href && (
                  <img
                    src={event.relationships.field_image.data.meta.imageDerivatives.links.max_1600_16_9.href}
                    alt={event.relationships.field_image.data.meta.alt}
                    className="mb-2 rounded-lg"
                  />
                )}
                <h2 className="text-2xl font-semibold">{event.attributes.title}</h2>
                <div className="flex flex-row">
                  {event.attributes.field_date?.value && (
                    <p className="text-gray-600">
                      {new Date(event.attributes.field_date.value).toLocaleDateString()} -{" "}
                    </p>
                  )}
                  {event.attributes.field_date?.end_value && (
                    <p className="text-gray-600">
                      <span>&nbsp;</span>
                      {new Date(event.attributes.field_date.end_value).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventsPage;

