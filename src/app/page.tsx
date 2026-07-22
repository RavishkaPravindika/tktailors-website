import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import CustomerReviews from "@/components/home/CustomerReviews";
import ContactPreview from "@/components/home/ContactPreview";

export const metadata: Metadata = {
  title: "T.K. Custom Tailors — Premium Tailoring & Bespoke Clothing",
  description:
    "T.K. Custom Tailors offers premium bespoke tailoring, custom suits, wedding wear, school uniforms, and expert alterations. Over 35 years of craftsmanship.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <ServicesPreview />
      <FeaturedGallery />
      <CustomerReviews />
      <ContactPreview />
    </>
  );
}
