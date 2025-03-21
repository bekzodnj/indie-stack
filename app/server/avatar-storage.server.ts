import { LocalFileStorage } from "@mjackson/file-storage/local";
import { FileUpload } from "@mjackson/form-data-parser";

export const fileStorage = new LocalFileStorage(".uploads/files");
export const getStorageKey = (userId: string, materialTitle: string) => {
  return `file-${userId}-${materialTitle}`;
};

export const pdfUploadHandler = (
  fileUpload: FileUpload,
  userId: string,
  materialTitle = "",
) => {
  if (
    fileUpload.fieldName === "file" &&
    fileUpload.type === "application/pdf"
  ) {
    const storageKey = getStorageKey(userId, materialTitle);
    fileStorage.set(storageKey, fileUpload);
    return fileStorage.get(storageKey);
  }
};
