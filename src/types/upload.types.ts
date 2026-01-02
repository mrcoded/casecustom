export interface UploadInfoActionsProps {
  open: () => void;
  isUploading: boolean;
  isPending: boolean;
  isDragOver: boolean;
  uploadProgress: number;
}
