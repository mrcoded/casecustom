import { Loader2 } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { db } from "@/config/db";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const { imgId } = params;

  //if no image id return
  if (!imgId) return notFound();

  //get the upload to get the configuration id
  const getUpload = async ({ imgId }: { imgId: string }) => {
    return await db.uploads.findUnique({
      where: {
        id: imgId,
      },
    });
  };

  //get the upload to get the configuration id
  const imageUpload = await getUpload({ imgId });
  //get the configuration id from the upload
  const configurationId = imageUpload?.configurationId;

  //redirect to customize page
  if (configurationId) {
    return redirect(`/configure/customize?id=${configurationId}`);
  }

  //if no configuration id return to upload page
  if (!configurationId) {
    return redirect(`/configure/upload`);
  }

  return (
    <div className="w-full mt-24 justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Preparing uploads...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
