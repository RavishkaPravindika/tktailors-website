// src/types/index.ts

export interface GuestBookEntry {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  mapEmbedUrl: string;
}

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  yearsOfExperience: number;
  specialization: string;
  bio: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category:
    | "bespoke-suits"
    | "wedding-wear"
    | "formal-wear"
    | "corporate"
    | "school-uniforms"
    | "ladies-collection"
    | "craftsmanship";
  width: number;
  height: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}
