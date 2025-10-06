import React from "react";
import { notFound } from "next/navigation";

import { db } from "@/config/db";
import { CustomizePageProps } from "./customize.types";

import DesignCustomization from "./_components/DesignCustomization";

const Page = async ({ searchParams }: CustomizePageProps) => {
  const { id } = searchParams;

  //if no id from searchParams
  if (!id || typeof id !== "string") {
    return notFound();
  }

  //Get configuration from db
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  //if configuration is not found
  if (!configuration) {
    return notFound();
  }

  //extract imageUrl, width and height
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
