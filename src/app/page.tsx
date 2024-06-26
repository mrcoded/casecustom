import CustomerReviews from "@/components/LandingPage/CustomerReviews";
import Hero from "@/components/LandingPage/Hero";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <CustomerReviews />
    </div>
  );
}
