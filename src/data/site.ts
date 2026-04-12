/** LinkedIn post for the USC guest lecture (same as “Like, comment, or repost” on USC pages). */
export const USC_LINKEDIN_GUEST_LECTURE_POST_HREF =
  "https://www.linkedin.com/feed/update/urn:li:ugcPost:7448413039529422848/";

export type ProjectLink = {
  name: string;
  url: string;
  description: string;
  /** When set, used only for the favicon (e.g. school branding while `url` stays on patrickmillegan.com). */
  faviconDomain?: string;
  /** When false, hide the Visit link (URL can stay for later). Default: show. */
  showVisit?: boolean;
};

export const projectLinks: ProjectLink[] = [
  {
    name: "Shopify Customer Accounts & Sign-in",
    url: "https://www.shopify.com/customer-accounts",
    description:
      "Shopify's customer account experience for one-click sign-in and self-serve order, return, and subscription management.",
  },
  {
    name: "Keap Athletics",
    url: "https://keapathletics.com",
    description:
      "An athletic apparel brand focused on shorts with secure, curved pockets that keep essentials in place.",
  },
  {
    name: "Cash Game Host",
    url: "https://cashgamehost.com/",
    description:
      "A free app for hosting home poker nights with digital buy-in tracking and simple settle-up flows.",
  },
  {
    name: "Guest lecturing for USC",
    url: USC_LINKEDIN_GUEST_LECTURE_POST_HREF,
    faviconDomain: "usc.edu",
    description:
      "Guest lecturing on product management at the USC Marshall School of Business.",
  },
];
