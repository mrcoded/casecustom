"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";

import { UploadService } from "@/services/uploads.services";

const Page = () => {
  const router = useRouter();
  const session = useSession();

  const [configId, setConfigId] = useState<string | null>(null);

  const { mutateAsync: handleUploads } = UploadService();

  const createUploads = async (configId: string | null) => {
    await handleUploads(configId);
  };

  //get configurationId from localStorage
  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    if (configurationId) setConfigId(configurationId);
  }, []);

  //redirect after authentication
  useEffect(() => {
    const syncUpload = async () => {
      if (session?.status === "authenticated" && configId) {
        try {
          if (configId) {
            //save imageurl to user uploads
            await createUploads(configId);

            localStorage.removeItem("configurationId");

            //redirect to preview page
            router.push(`/configure/preview?id=${configId}`);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.log("Error creating upload:", error);
        }
      }
    };

    syncUpload();
  }, [session?.status, configId, router, handleUploads]);

  return (
    <div className="w-full mt-24 justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
