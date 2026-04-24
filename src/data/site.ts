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
  /** Optional media tiles shown inside the project card. */
  mediaLinks?: Array<{
    label: string;
    url: string;
    platform: "youtube" | "spotify" | "article";
    thumbnailUrl?: string;
  }>;
};

export const projectLinks: ProjectLink[] = [
  {
    name: "Shopify Customer Accounts & Sign-in",
    url: "https://www.shopify.com/customer-accounts",
    description:
      "Shopify's customer account experience for one-click sign-in and self-serve order, return, and subscription management.",
    mediaLinks: [
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=vTrc7af4IEQ",
        platform: "youtube",
      },
      {
        label: "Spotify",
        url: "https://open.spotify.com/episode/7qKFg9Vyd7rlj6YDyiY7Xi",
        platform: "spotify",
        thumbnailUrl:
          "https://d2bwo9zemjwxh5.cloudfront.net/ep-logo/pbblog19765795/Boring_Ecom_Cover_Photo_16_1_73w9w_1200x628.jpg?s=a568a4305b11878bf3792f0ed1b44ce8&e=jpg",
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=bmNVTkwHYVo",
        platform: "youtube",
      },
    ],
  },
  {
    name: "Keap Athletics",
    url: "https://keapathletics.com",
    description:
      "An athletic apparel brand focused on shorts with secure, curved pockets that keep essentials in place.",
    mediaLinks: [
      {
        label: "The Adult Man",
        url: "https://theadultman.com/fashion-and-style/keap-shorts-review/",
        platform: "article",
        thumbnailUrl: "https://theadultman.com/wp-content/uploads/2021/03/Keap-Shorts-Review.jpg",
      },
      {
        label: "The Coolector",
        url: "https://www.thecoolector.com/keap-the-active-shorts/",
        platform: "article",
        thumbnailUrl: "https://www.thecoolector.com/wp-content/uploads/2020/06/keap-scaled.jpg",
      },
      {
        label: "Men's Gear",
        url: "https://mensgear.net/keap-athletics-shorts/",
        platform: "article",
        thumbnailUrl: "https://mensgear.net/wp-content/uploads/2021/09/1280-x-858-20.jpg",
      },
    ],
  },
  {
    name: "Cash Game Host",
    url: "https://cashgamehost.com/",
    description:
      "A free app for hosting home poker nights with digital buy-in tracking and simple settle-up flows.",
  },
  {
    name: "Crokinole Scorekeeper",
    url: "https://patrickmillegan.com/crokinole",
    faviconDomain: "patrickmillegan.com",
    description:
      "A simple scorekeeper for crokinole — supports conventional (cancellation, play to 100) and tournament (4-round, 2/1/0) modes with game history.",
  },
  {
    name: "Guest lecturing for USC",
    url: USC_LINKEDIN_GUEST_LECTURE_POST_HREF,
    faviconDomain: "usc.edu",
    description:
      "Guest lecturing on product management at the USC Marshall School of Business.",
  },
];
