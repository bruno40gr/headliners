import { Asap_Condensed } from 'next/font/google';
import { notFound } from 'next/navigation';
import HomePreview from '../../../../src/next/HomePreview';
import { previewPublications } from '../../../../src/next/preview-publications';

const asapCondensed = Asap_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-asap-condensed',
});

export const metadata = {
  title: 'Publication preview',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export function generateStaticParams() {
  return previewPublications.map(({ slug }) => ({ slug }));
}

export default async function PublicationPreviewPage({ params }) {
  const { slug } = await params;
  if (!previewPublications.some(publication => publication.slug === slug)) notFound();
  return <div className={asapCondensed.variable}><HomePreview publicationSlug={slug} /></div>;
}