import { notFound } from 'next/navigation';
import HomePreview from '../../../src/next/HomePreview';
import { HomeDesignFrame } from '../../../src/next/ReleaseFrames';
import { previewPublications } from '../../../src/next/preview-publications';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = previewPublications.find(item => item.slug === slug);
  if (!publication) notFound();
  const path = `/publications/${slug}`;
  return {
    title: publication.title,
    description: publication.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: publication.title,
      description: publication.excerpt,
      url: `https://www.headlinermusicacademy.com${path}`,
      images: [{ url: publication.image, alt: publication.alt }],
      ...(publication.publishedAt ? { publishedTime: publication.publishedAt } : {}),
    },
  };
}

export function generateStaticParams() {
  return previewPublications.map(({ slug }) => ({ slug }));
}

export default async function PublicationPage({ params }) {
  const { slug } = await params;
  if (!previewPublications.some(publication => publication.slug === slug)) notFound();
  return <HomeDesignFrame><HomePreview publicationSlug={slug} /></HomeDesignFrame>;
}