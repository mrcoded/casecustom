import React from "react";
import { AddressComponentProps } from "@/types/general.types";

const AddressComponent = ({
  addressInfo,
  addressLabel,
}: AddressComponentProps) => {
  return (
    <div>
      <p className="font-medium text-gray-900">{addressLabel}</p>
      <div className="mt-2 text-zinc-700">
        <address className="not-italic">
          <span className="block">{addressInfo?.name}</span>
          <span className="block">{addressInfo?.street}</span>
          <span className="block">
            {addressInfo?.postalCode} {addressInfo?.city}
          </span>
        </address>
      </div>
    </div>
  );
};
export default AddressComponent;
