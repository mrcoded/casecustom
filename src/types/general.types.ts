export interface AddressComponentProps {
  addressInfo: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
  } | null;
  addressLabel: string;
}
