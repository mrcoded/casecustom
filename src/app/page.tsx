import Hero from "@/components/LandingPage/Hero";
import GettingStarted from "@/components/LandingPage/GettingStarted";
import CustomerReviews from "@/components/LandingPage/CustomerReviews";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      <Hero />
      <CustomerReviews />
      <GettingStarted />
    </div>
  );
}
