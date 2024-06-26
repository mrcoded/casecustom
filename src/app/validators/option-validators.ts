//bg-blue-900 border-blue-900
//bg-zinc-950 border-zinc-950
//bg-rose-950 border-rose-950

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
    { label: "iPhone X", value: "iphonex" },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone12",
      value: "iphone12",
    },
    {
      label: "iPhone13",
      value: "iphone13",
    },
    {
      label: "iPhone14",
      value: "iphone14",
    },
    {
      label: "iPhone15",
      value: "iphone15",
    },
  ],
} as const;
