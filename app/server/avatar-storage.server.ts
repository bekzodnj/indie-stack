import { LocalFileStorage } from "@mjackson/file-storage/local";
import { FileUpload } from "@mjackson/form-data-parser";

export const fileStorage = new LocalFileStorage(".uploads/avatars");
export const getStorageKey = (userId: string) => {
  return `user-${userId}-file`;
};

export const pdfUploadHandler = (fileUpload: FileUpload, userId: string) => {
  if (
    fileUpload.fieldName === "file" &&
    fileUpload.type === "application/pdf"
  ) {
    const storageKey = getStorageKey(userId);
    fileStorage.set(storageKey, fileUpload);
    return fileStorage.get(storageKey);
  }
};
