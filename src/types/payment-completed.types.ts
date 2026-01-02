export interface DeliveryInfoProps {
  shippingAddress: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
  } | null;
  billingAddress: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
  } | null;
}
