import CustomerReviews from "@/components/LandingPage/CustomerReviews";
import GettingStarted from "@/components/LandingPage/GettingStarted";
import Hero from "@/components/LandingPage/Hero";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <CustomerReviews />
      <GettingStarted />
    </div>
  );
}
