import { fetchEventById } from "../../../../../../../libs/api/fetchEventById";
import { notFound } from "next/navigation";
import { fetchEventBySlug } from "../../../../../../../libs/api/fetchEventBySlug";
interface EventPageProps {
  params: { slug: string };
  searchParams: { id?: string };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiBase = process.env.NEXT_PUBLIC_API_BASE;
const username = process.env.NEXT_PUBLIC_HTAUTH_U;
const password = process.env.NEXT_PUBLIC_HTAUTH_P;
const consumerId = process.env.NEXT_PUBLIC_CONSUMERUUID;
const apiKey = process.env.NEXT_PUBLIC_UP_API_KEY;

// Server Component - Fetches event data before rendering
export default async function EventPage({ params }: EventPageProps) {
    const eventParams = await params; // Extract event slug from URL
// Extract event ID from URL



  console.log("eventParams", eventParams)
//   console.log("eventId", eventId)
//   if (!eventId) {
//     console.error("Missing event ID");
//     return notFound(); // Redirect to 404 page if ID is missing
//   }

//   const event = await fetchEventById(eventId); // Fetch event by ID
  const eventSlug = eventParams.slug;
  const event = await fetchEventBySlug(eventSlug); // Fetch event by slug
  console.log("pageEvent", event, typeof event);

  

  if (typeof event === "undefined" || event === null) {
    return notFound();
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.date}</p>
      
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          className="mt-4 rounded-lg max-w-full h-auto" 
        />
      )}

      {event.description && (
        <div 
          className="mt-4 text-gray-800" 
          dangerouslySetInnerHTML={{ __html: event.description }} 
        />
      )}
    </div>
  );
}
