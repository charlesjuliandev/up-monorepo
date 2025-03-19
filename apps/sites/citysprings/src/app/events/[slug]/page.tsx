import { fetchEventById } from "../../../../../../../libs/api/fetchEventById";
import { notFound } from "next/navigation";
import { fetchEventBySlug } from "../../../../../../../libs/api/fetchEventBySlug";
interface EventPageProps {
  params: { slug: string };
  searchParams: { id?: string };
}

export default async function EventPage({ params }: EventPageProps) {
  
  const eventParams = await params; // Extract event slug from URL
  const eventSlug = eventParams.slug;
  
  const event = await fetchEventBySlug(eventSlug); // Fetch event by slug
  
  if (typeof event === "undefined" || event === null) {
    return notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.startDate}</p>
      
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
