//bg-blue-900 border-blue-900
//bg-zinc-950 border-zinc-950
//bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "../constant/product";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-950" },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-900",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-950",
  },
] as const;

export const MODELS = {
  name: "models",
  options: [
    // iPhone 11 Series
    { label: "iPhone 11 Pro", value: "iphone11Pro" },
    { label: "iPhone 11 Pro Max", value: "iphone11ProMax" },

    // iPhone 12 Series
    { label: "iPhone 12 Pro", value: "iphone12Pro" },
    { label: "iPhone 12 Pro Max", value: "iphone12ProMax" },

    // iPhone 13 Series
    { label: "iPhone 13 Pro", value: "iphone13Pro" },
    { label: "iPhone 13 Pro Max", value: "iphone13ProMax" },

    // iPhone 14 Series
    { label: "iPhone 14 Pro", value: "iphone14Pro" },
    { label: "iPhone 14 Pro Max", value: "iphone14ProMax" },

    // iPhone 15 Series
    { label: "iPhone 15 Pro", value: "iphone15Pro" },
    { label: "iPhone 15 Pro Max", value: "iphone15ProMax" },

    // iPhone 16 Series
    { label: "iPhone 16 Pro", value: "iphone16Pro" },
    { label: "iPhone 16 Pro Max", value: "iphone16ProMax" },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicon",
      value: "silicon",
      description: undefined,
      price: PRODUCT_PRICES.material.silicon,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;
