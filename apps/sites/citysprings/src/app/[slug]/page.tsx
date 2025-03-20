import { fetchPageBySlug } from "../../../../../../libs/api/fetchPageBySlug";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    const pageParams = await params

  const page = await fetchPageBySlug(pageParams.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </div>
  );
}
