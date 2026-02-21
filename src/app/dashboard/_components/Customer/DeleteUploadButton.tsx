"use client";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import { deleteUpload } from "@/lib/actions/uploads.actions";

const DeleteUploadButton = ({ uploadId }: { uploadId: string }) => {
  const { toast } = useToast();

  //handle delete with confirmation dialog
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUpload(id);
      if (result.success) {
        toast({ title: "Deleted", description: "Image removed successfully." });
      }
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not delete image.",
      });
    }
  };

  return (
    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 shadow-sm">
            <Trash2 className="h-4 w-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your upload from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(uploadId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteUploadButton;
