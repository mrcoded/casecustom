import { notFound } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";
import DesignPreview from "./DesignPreview";

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

  const configuraton = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuraton) {
    return notFound();
  }

  return <DesignPreview configuration={configuraton} />;
};

export default Page;
