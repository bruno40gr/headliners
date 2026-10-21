import ExpressivePreviewFrame from '../../../../src/next/ExpressivePreviewFrame';
import { notFound } from 'next/navigation';
import HomePreview from '../../../../src/next/HomePreview';
import { previewPublications } from '../../../../src/next/preview-publications';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = previewPublications.find(item => item.slug === slug);
  if (!publication) notFound();
  return {
    title: publication.title,
    description: publication.excerpt,
    robots: { index: false, follow: false },
    alternates: { canonical: `/publications/${slug}` },
  };
}

export function generateStaticParams() {
  return previewPublications.map(({ slug }) => ({ slug }));
}

export default async function PublicationPreviewPage({ params }) {
  const { slug } = await params;
  if (!previewPublications.some(publication => publication.slug === slug)) notFound();
  return <ExpressivePreviewFrame><HomePreview publicationSlug={slug} /></ExpressivePreviewFrame>;
}