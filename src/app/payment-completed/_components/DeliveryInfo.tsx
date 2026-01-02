import React from "react";

import AddressComponent from "@/components/AddressComponent";
import { DeliveryInfoProps } from "@/types/payment-completed.types";

const DeliveryInfo = ({
  shippingAddress,
  billingAddress,
}: DeliveryInfoProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
        {/* Shipping Address Component */}
        <AddressComponent
          addressInfo={shippingAddress}
          addressLabel="Shipping address"
        />
        {/* Billing Address Component */}
        <AddressComponent
          addressInfo={billingAddress}
          addressLabel="Billing address"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
        <div>
          <p className="font-medium text-zinc-900">Payment status</p>
          <p className="mt-2 text-zinc-700">Paid</p>
        </div>

        <div>
          <p className="font-medium text-zinc-900">Shipping status</p>
          <p className="mt-2 text-zinc-700">
            DHL shipping takes up to 3 working days
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
