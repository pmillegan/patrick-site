/** LinkedIn post for the USC guest lecture (same as “Like, comment, or repost” on USC pages). */
export const USC_LINKEDIN_GUEST_LECTURE_POST_HREF =
  "https://www.linkedin.com/feed/update/urn:li:ugcPost:7448413039529422848/";

export type ProjectLink = {
  name: string;
  url: string;
  description: string;
  /** Optional role shown in the project card header (resume-style metadata). */
  role?: string;
  /** Optional date range shown in the project card header (resume-style metadata). */
  years?: string;
  /** Optional icon image URL for the project card (replaces favicon rendering when provided). */
  iconImageUrl?: string;
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
    role: "Senior Product Lead",
    years: "2021-2026",
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
    name: "Guest lecturing for USC",
    url: USC_LINKEDIN_GUEST_LECTURE_POST_HREF,
    faviconDomain: "usc.edu",
    description:
      "Guest lecturing on product management at the USC Marshall School of Business.",
  },
  {
    name: "Keap Athletics",
    url: "https://keapathletics.com",
    role: "Founder",
    years: "2015-present",
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
    role: "Founder",
    years: "2025-present",
    description:
      "A free app for hosting home poker nights with digital buy-in tracking and simple settle-up flows.",
  },
  {
    name: "Green Chef",
    url: "https://www.greenchef.com",
    role: "Senior Director of Product",
    years: "2015-2019",
    description:
      "Led product strategy and execution for Green Chef's core customer, subscription, and growth experiences.",
  },
  {
    name: "Star Wars Commander",
    url: "https://en.wikipedia.org/wiki/Star_Wars_Commander",
    iconImageUrl: "https://upload.wikimedia.org/wikipedia/en/c/cb/Star_Wars_Commander_Icon.png",
    role: "Product Lead",
    years: "2013-2015",
    description:
      "Product lead for Star Wars Commander, a mobile strategy game where players build, battle, and choose the Rebel Alliance or Galactic Empire.",
    mediaLinks: [
      {
        label: "Gamezebo",
        url: "https://www.gamezebo.com/play/star-wars-commander-has-the-best-rate-this-game-screen-ever/",
        platform: "article",
      },
    ],
  },
  {
    name: "Crokinole Scorekeeper",
    url: "https://patrickmillegan.com/crokinole",
    faviconDomain: "patrickmillegan.com",
    description:
      "A simple scorekeeper for crokinole — supports conventional (cancellation, play to 100) and tournament (4-round, 2/1/0) modes with game history.",
  },
];
