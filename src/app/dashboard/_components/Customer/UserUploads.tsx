"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Uploads } from "@prisma/client";

import DeleteUploadButton from "./DeleteUploadButton";

const UserUploads = ({ uploads }: { uploads: Uploads[] }) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Uploads
        </h2>
        <p className="text-base sm:text-xl text-muted-foreground">
          View and manage your recent uploads here.
        </p>
      </div>

      {uploads && uploads.length > 0 ? (
        <Card className="flex flex-wrap items-center justify-center gap-3 p-2">
          {uploads?.slice(0, 9).map((upload, index) => (
            <Card
              key={upload.id}
              className="relative group overflow-hidden sm:w-[220px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50"
            >
              {/*  Delete button */}
              <DeleteUploadButton uploadId={upload.id} />

              <Link
                href={`/upload-callback?imgId=${upload.id}`}
                className="block cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative max-w-[150px] sm:max-w-full h-auto aspect-square overflow-hidden bg-zinc-100">
                    {upload.imageUrl && (
                      <Image
                        src={upload.imageUrl}
                        alt="Uploaded image"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-3 flex flex-col items-start gap-1">
                  <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                    {new Date(upload.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </Card>
      ) : (
        <div className="text-lg sm:text-2xl font-semibold text-center py-12 text-muted-foreground">
          No uploads yet.
        </div>
      )}
    </div>
  );
};

export default UserUploads;
