"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getPaymentStatus } from "@/lib/actions/payment-status.actions";

import PaymentCost from "./PaymentCost";
import DeliveryInfo from "./DeliveryInfo";
import PaymentStatus from "./PaymentStatus";
import PhonePreview from "@/components/PhonePreview";

const PaymentCompleted = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  //Get payment status from db
  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  //If payment status is undefined
  if (data === undefined) {
    return (
      <PaymentStatus
        heading="Loading your order..."
        description="This won't take long."
      />
    );
  }

  //If payment status is currently false
  if (data === false) {
    return (
      <PaymentStatus
        heading="Verifying your payment..."
        description="This might take moment."
      />
    );
  }

  //extract configuration, billingAddress, shippingAddress, amount from data
  const { configuration, billingAddress, shippingAddress, amount } = data;

  //extrat color property from configuration
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            We've recieved your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              We at CaseCustom beleives in quality phone case that looks good
              and lasts longer, therefore we offer a 3-years print gurantee.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>

        {/* Shipping & Billing Address and status */}
        <DeliveryInfo
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
        />

        {/* Payment Cost Info */}
        <PaymentCost amount={amount} />
      </div>
    </div>
  );
};

export default PaymentCompleted;
