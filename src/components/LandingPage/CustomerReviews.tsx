import { Check, Star } from "lucide-react";

import { Icons } from "@/components/Icons";
import { CUSTOMER_REVIEWS } from "@/constant/landing-page";
import Reviews from "@/components/LandingPage//Reviews/Reviews";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";

const CustomerReviews = () => {
  return (
    <section className="bg-slate-100 py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            What our{" "}
            <span className="relative px-2">
              customers{" "}
              <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />{" "}
            </span>{" "}
            say
          </h2>
          <img
            src="/thumbnail.png"
            alt="thumbnail"
            className="w-40 order-0 lg:order-2"
          />
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:x-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          {CUSTOMER_REVIEWS.map((review, i) => (
            <div
              key={i}
              className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20"
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 text-green-600 fill-green-600"
                  />
                ))}
              </div>
              <div className="text-lg leading-8">
                <p>
                  "{review.textStart}{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    {review.textMiddle}
                  </span>
                  {review.textEnd}"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src={review.img}
                  alt="user"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      <div className="pt-16">
        <Reviews />
      </div>
    </section>
  );
};

export default CustomerReviews;
