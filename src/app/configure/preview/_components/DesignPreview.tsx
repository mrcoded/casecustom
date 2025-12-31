"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

import Confetti from "react-dom-confetti";
import { useSession } from "next-auth/react";
import { Configuration } from "@prisma/client";

import { paymentService } from "@/services/payment.service";
import { COLORS, MODELS } from "@/validators/option-validators";

import { Button } from "@/components/ui/button";
import DesignPreviewCost from "./DesignPreviewCost";
import PhoneTemplate from "@/components/PhoneTemplate";
import LoginModal from "@/components/modals/LoginModal";

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  //configure confetti
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true));

  //extract id from configuration
  const { id } = configuration;

  //Get user
  const { data } = useSession();
  const user = data?.user;

  //destructure color, model, finish, material from configuration
  const { color, model } = configuration;

  //Get color choice
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  //Get phone model choice
  const { label: modeLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  //Payment service hooks
  const { mutate: payment } = paymentService({ configId: id });

  //HandleCheckout function handler
  const handleCheckout = () => {
    if (user) {
      // create payment session
      return payment();
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      {/* Trigger Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <PhoneTemplate
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modeLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-image-none">
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            {/* Preview Design Cost */}
            <DesignPreviewCost {...configuration} />

            <div className="mt-8 flex justify-center pb-12">
              <Button
                className="px-4 sm:px-6 lg:px-8"
                onClick={() => handleCheckout()}
              >
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline  " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
