import React from "react";
import { notFound } from "next/navigation";

import { db } from "@/config/db";
import DesignPreview from "./_components/DesignPreview";
import { CustomizePageProps } from "@/types/customize.types";

const Page = async ({ searchParams }: CustomizePageProps) => {
  const { id } = await searchParams;

  //if no id from searchParams
  if (!id || typeof id !== "string") {
    return notFound();
  }

  //Get updated configuration
  const configuraton = await db.configuration.findUnique({
    where: { id },
  });

  //if updated configuration not found
  if (!configuraton) {
    return notFound();
  }

  return <DesignPreview configuration={configuraton} />;
};

export default Page;
