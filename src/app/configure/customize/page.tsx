import { notFound } from "next/navigation";
import React from "react";
import DesignCustomization from "./DesignCustomization";
import { db } from "../../../db";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignCustomization
      configId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{ width, height }}
    />
  );
};

export default Page;
