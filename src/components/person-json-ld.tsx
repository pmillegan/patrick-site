import { siteUrl } from "@/lib/seo";

const logoUrl = `${siteUrl}/apple-touch-icon.png`;
const profileImageUrl = `${siteUrl}/profile.jpg`;

const personAndWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Patrick Millegan",
      url: siteUrl,
      image: profileImageUrl,
      jobTitle: "Product developer",
      description:
        "Product developer based in San Mateo, California. Work spans Shopify, Keap Athletics, guest lectures at USC Marshall, and independent projects.",
      sameAs: [
        "https://www.linkedin.com/in/pmillegan",
        "https://x.com/pmillegan",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Patrick Millegan",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 180,
        height: 180,
      },
      image: profileImageUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Patrick Millegan",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

/**
 * Structured data for search engines (Person, Organization + logo, WebSite).
 */
export default function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personAndWebsiteJsonLd),
      }}
    />
  );
}
