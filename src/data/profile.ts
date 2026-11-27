export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type SkillCategory = "frontend" | "backend" | "tools" | "other";

export type ExperimentStatus = "active" | "tinkering" | "archived";

export type MomentCategory = "nature" | "city";

export type SocialPlatform =
  | "github"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "spotify"
  | "email"
  | "discord"
  | "website";

export interface Identity {
  fullName: string;
  nickname: string;
  role: string;
  tagline: string;
  avatar: string;
  location: string;
}

export interface DateInfo {
  birthDate: string;
  activeSince: string;
  lastUpdated: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  note?: string;
}

export interface Experiment {
  id: string;
  title: string;
  status: ExperimentStatus;
  description: string;
  image?: string;
  url?: string;
  urlLabel?: string;
}

export interface Hobby {
  id: string;
  name: string;
  description?: string;
}

export interface Moment {
  id: string;
  title: string;
  category: MomentCategory;
  image: string;
  caption: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  year: string;
  proofLabel?: string;
  proofUrl?: string;
}

export interface SocialLink {
  id: "soc-github" | "soc-tiktok" | "soc-instagram" | "soc-discord" | string;
  platform: SocialPlatform;
  label: string;
  handle?: string;
  url: string;
}

export interface Profile {
  identity: Identity;
  dates: DateInfo;
  bio: string;
  currentFocus: string;
  status: string;
  skills: Skill[];
  experiments: Experiment[];
  hobbies: Hobby[];
  moments: Moment[];
  highlights: Highlight[];
  socials: SocialLink[];
}

export const profile: Profile = {
  identity: {
    fullName: "Abiel",
    nickname: "Biel",
    role: "Web & Frontend Developer",
    tagline:
      "Building things, learning endlessly. I enjoy turning ideas into interactive web experiences, exploring new technologies, and bringing things to life through code.",
    avatar: "avatar.jpg",
    location: "Indonesia, East Java",
  },

  dates: {
    birthDate: "2009-12-22",
    activeSince: "2025-02-05",
    lastUpdated: "2026-11-26",
  },

  bio: "I'm a developer who enjoys turning ideas into reality through code. I spend my time experimenting, building interactive experiences, and exploring new ways to make the web more interesting. Always curious. Always creating. Never standing still.",

  currentFocus:
    "Currently exploring interactive UI, component-driven development, and creating web experiences that feel intuitive and engaging.",
  status: "this web was made because im bored.",

  skills: [
    { name: "React", category: "frontend", level: "advanced", note: "Interactive UI & components" },
    { name: "TypeScript", category: "frontend", level: "intermediate", note: "Typed state & data models" },
    { name: "JavaScript", category: "frontend", level: "intermediate", note: "DOM & UI interactions" },
    { name: "HTML & CSS", category: "frontend", level: "intermediate", note: "Responsive layouts & themes" },
    { name: "CSS & Motion", category: "frontend", level: "intermediate", note: "Transitions & subtle motion" },
    { name: "Vite", category: "tools", level: "intermediate", note: "Fast dev & production builds" },
    { name: "Git", category: "tools", level: "intermediate", note: "Version control & workflows" },
    { name: "Lua", category: "other", level: "advanced", note: "Scripting & logic experiments" },
    { name: "Luau", category: "other", level: "intermediate", note: "Game scripts & systems" },
    { name: "Node.js", category: "backend", level: "beginner", note: "Basic runtime & tooling" },
    { name: "SQL", category: "backend", level: "beginner", note: "Relational query basics" },
    { name: "Java", category: "other", level: "intermediate", note: "OOP & academic exercises" },
    { name: "Python", category: "other", level: "intermediate", note: "Quick scripts & automation" },
    { name: "C / C++", category: "other", level: "intermediate", note: "Core logic & fundamentals" },
  ],

  experiments: [
    {
      id: "exp-1",
      title: "Lumina — Visual & Photo Archive",
      status: "archived",
      description:
        "Editorial gallery layout with masonry grid filtering, keyboard navigation, and full-bleed image preview.",
      image: "projects/lumina.png",
    },
    {
      id: "exp-2",
      title: "BrewNote — Coffee Shop Web",
      status: "archived",
      description:
        "Modern cafe storefront featuring interactive menu filtering, drink customization, and order drawer.",
      image: "projects/brewnote.png",
    },
    {
      id: "exp-3",
      title: "PulseWeather — Forecast Dashboard",
      status: "active",
      description:
        "Real-time weather and air quality interface with hourly temperature charts and saved city switcher.",
      image: "projects/pulseweather.png",
      url: "https://pulse-weather-chi.vercel.app/",
      urlLabel: "Live Demo",
    },
  ],

  hobbies: [
    {
      id: "hobby-coding",
      name: "Coding & building small tools",
      description: "Tinkering with UI components, animations, and personal web utilities.",
    },
    {
      id: "hobby-music",
      name: "Listening to music & OSTs",
      description: "Song repeater",
    },
    {
      id: "hobby-media",
      name: "Watching & exploring stories",
      description: "I like story with good world building.",
    },
  ],

  moments: [
    {
      id: "mom-1",
      title: "Night Facade",
      category: "city",
      image: "moments/gedung.jpg",
      caption: "Warm light line cutting through the dark.",
    },
    {
      id: "mom-2",
      title: "Open Sky",
      category: "nature",
      image: "moments/awan.jpg",
      caption: "Sunlight breaking through calm clouds.",
    },
    {
      id: "mom-3",
      title: "Still Lake",
      category: "nature",
      image: "moments/danau.jpg",
      caption: "Clear water and quiet pebbles by the shore.",
    },
    {
      id: "mom-4",
      title: "Sea Foam",
      category: "nature",
      image: "moments/laut.jpg",
      caption: "Waves rolling over deep dark water.",
    },
    {
      id: "mom-5",
      title: "After Meal",
      category: "city",
      image: "moments/piring.jpg",
      caption: "Clean finish after a good bite.",
    },
    {
      id: "mom-6",
      title: "Shore & Sky",
      category: "nature",
      image: "moments/laut-dan-awan.jpg",
      caption: "Wide blue sky above the shoreline.",
    },
    {
      id: "mom-7",
      title: "Menu Card",
      category: "city",
      image: "moments/menu.jpg",
      caption: "Picking something cold before sitting down.",
    },
    {
      id: "mom-8",
      title: "Aisle Light",
      category: "city",
      image: "moments/toko.jpg",
      caption: "Afternoon sun hitting the shop shelves.",
    },
  ],

  highlights: [
    {
      id: "hl-1",
      title: "100/100 Lighthouse Performance & Accessibility",
      description:
        "Optimized React & Vite bundle sizes, semantic markup, and responsive layouts to hit top audit scores on personal web builds.",
      year: "2026",
      proofLabel: "View GitHub",
      proofUrl: "https://github.com/abiellvcz",
    },
    {
      id: "hl-2",
      title: "3 Interactive Frontend Prototypes Shipped",
      description:
        "Built and deployed Lumina, BrewNote, and PulseWeather from scratch with custom state management, filtering, and keyboard navigation.",
      year: "2025",
      proofLabel: "See Projects",
      proofUrl: "#experiments",
    },
    {
      id: "hl-3",
      title: "Custom Modular Game Systems in Lua & Luau",
      description:
        "Engineered reusable client-side UI controllers and event-driven gameplay scripts with clean state synchronization.",
      year: "2025",
    },
  ],

  socials: [
    {
      id: "soc-github",
      platform: "github",
      label: "GitHub",
      handle: "@abiellvcz",
      url: "https://github.com/abiellvcz",
    },
    {
      id: "soc-tiktok",
      platform: "tiktok",
      label: "TikTok",
      handle: "@abiellsvc",
      url: "https://www.tiktok.com/@abiellsvc",
    },
    {
      id: "soc-instagram",
      platform: "instagram",
      label: "Instagram",
      handle: "@abiellsvc",
      url: "https://www.instagram.com/abiellsvc",
    },
    {
      id: "soc-discord",
      platform: "discord",
      label: "Discord",
      handle: "@abiellsvc",
      url: "https://discord.com/users/997145407773741086",
    },
  ],
};

function parseIsoDateParts(iso: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  return { year, month, day };
}

export function getAge(birthDate: string, today: Date = new Date()): number {
  const parts = parseIsoDateParts(birthDate);
  if (!parts) return 0;

  let age = today.getFullYear() - parts.year;
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const hasHadBirthday =
    currentMonth > parts.month || (currentMonth === parts.month && currentDay >= parts.day);

  if (!hasHadBirthday) {
    age -= 1;
  }

  return Math.max(0, age);
}

export function formatDate(iso: string): string {
  const parts = parseIsoDateParts(iso);
  if (!parts) return iso;

  const localDate = new Date(parts.year, parts.month - 1, parts.day);
  return localDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}