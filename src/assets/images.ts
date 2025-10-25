// Central place to register image paths used across the app.
// Put actual image files under the public/images/ directory.
// Then reference them here so components can import from one place.

export type ImageKey =
  | "hero1"
  | "hero2"
  | "hero3"
  | "hero4"
  | "hero5"
  | "shreyMahimaWedding"
  | "shreyMahimaWedding2"
  | "photographyCategory"
  | "makeupCategory"
  | "planningCategory"
  | "blogPhotography"
  | "blogMakeup"
  | "blogTraditions"
  | "blogEvents"
  | "planningFormBackground"
  | "logo"
  | "placeholder";

export const IMAGES: Record<ImageKey, string> = {
  // Hero backgrounds - Using Lorem Picsum for reliable images
  hero1: "https://picsum.photos/800/600?random=1", // Indian wedding ceremony
  hero2: "https://picsum.photos/800/600?random=2", // Indian bridal makeup
  hero3: "https://picsum.photos/800/600?random=3", // Indian wedding decor
  hero4: "https://picsum.photos/800/600?random=4", // Indian wedding photography
  hero5: "https://picsum.photos/800/600?random=5", // Indian wedding dance

  // Real wedding images
  shreyMahimaWedding: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5714.jpg",
  shreyMahimaWedding2: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5776.jpg",

  // Photography category image
  photographyCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp Image 2025-10-25 at 12.48.12.jpeg",

  // Makeup category image
  makeupCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/IMG_0001-10.jpg",

  // Planning & Decor category image
  planningCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp%20Image%202025-10-25%20at%2012.47.13.jpeg",

  // Blog images
  blogPhotography: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5591.jpg",
  blogMakeup: "https://bridesideimages.blob.core.windows.net/tbs-website-images/900ebac2-9bbe-499c-a565-6debc8f4864a.jpeg",
  blogTraditions: "https://bridesideimages.blob.core.windows.net/tbs-website-images/99ce097a-a135-4bc8-8d83-60aae1ce63d3.jpeg",
  blogEvents: "https://bridesideimages.blob.core.windows.net/tbs-website-images/fd04e187-92b3-4c80-9c8e-b7df8877ae3d.jpeg",

  // Planning form background image
  planningFormBackground: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5714.jpg",

  // Branding (optional)
  // Set this to your provided logo file path (PNG/SVG) placed under public/images/
  logo: "https://bridesideimages.blob.core.windows.net/tbs-website-images/heyueye.png",

  // Generic fallback - Using Lorem Picsum
  placeholder: "https://picsum.photos/800/600?random=99",
};

// Helper: returns only the hero image paths in order for slideshows
export const getHeroImages = (): string[] => [
  // Hero section - single image
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/WhatsApp Image 2025-10-25 at 16.24.38.jpeg",
];


