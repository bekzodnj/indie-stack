import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";

import { fileStorage, getStorageKey } from "~/server/avatar-storage.server";
import { Route } from "./+types/user-profile";

export async function action({ request, params }: Route.ActionArgs) {
  const uploadHandler = (fileUpload: FileUpload) => {
    if (
      fileUpload.fieldName === "avatar" &&
      fileUpload.type.startsWith("image/")
    ) {
      //process the file
      let storageKey = getStorageKey(params.id);

      fileStorage.set(storageKey, fileUpload);

      return fileStorage.get(storageKey);
    }
  };
  const formData = await parseFormData(request, uploadHandler);
}

export default function UserProfile({
  actionData,
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <h2>User {params.id}</h2>
      <form method="POST" encType="multipart/form-data">
        <input type="file" name="avatar" accept="image/*" />
        <button>Submit</button>
      </form>
      <img src={`/user/${params.id}/avatar`} alt="user avatar" />
    </div>
  );
}
