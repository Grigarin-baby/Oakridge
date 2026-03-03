import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Oakridge College | Legacy of Excellence in Education',
  description: 'Learn about Oakridge College\'s journey of educational excellence since 2010. Discover our mission, vision, facilities, and commitment to academic excellence.',
  keywords: 'Oakridge College, education, arts and science college, higher education',
  openGraph: {
    title: 'About Oakridge College | Legacy of Excellence in Education',
    description: 'Discover Oakridge College\'s journey of educational excellence, our mission, vision, and world-class facilities.',
    images: ['/images/ilahiya-college.jpg'],
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 