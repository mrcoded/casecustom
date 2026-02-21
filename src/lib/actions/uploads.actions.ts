"use server";

import { db } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";

export const createUploads = async ({
  configId,
}: {
  configId: string | null;
}) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  //if no config id return
  if (!configId) return;

  //find the configuration to get the image url
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  //check if upload already exists for the user and image
  const existingUpload = await db.uploads.findFirst({
    where: {
      userId: userId,
      imageUrl: configuration?.imageUrl,
      configurationId: configuration?.id,
    },
  });

  //if upload already exists
  if (existingUpload) return;

  return await db.uploads.create({
    data: {
      imageUrl: configuration?.imageUrl,
      userId: userId,
      configurationId: configuration?.id,
    },
  });
};

export const deleteUpload = async (uploadId: string) => {
  const utapi = new UTApi();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  //Find the upload to get the URL and Ensure user owns the file
  const upload = await db.uploads.findUnique({
    where: { id: uploadId, userId },
  });

  // If no upload found or user doesn't own it, throw an error
  if (!upload) throw new Error("Upload not found");

  try {
    const fileKey = upload?.imageUrl ? upload.imageUrl.split("/f/")[1] : null;
    if (fileKey) {
      //Delete from UploadThing Storage
      await utapi.deleteFiles(fileKey);
    }

    //Delete from Prisma Database
    await db.uploads.delete({
      where: { id: uploadId },
    });

    //Refresh the UI
    revalidatePath("/configure/upload");

    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { error: "Failed to delete file" };
  }
};
