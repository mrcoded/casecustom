import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import ReviewGrid from "@/components/LandingPage/Reviews/ReviewGrid";

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden="true"
        alt="what-people-are-buying"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default Reviews;
