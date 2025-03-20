import { fileStorage, getStorageKey } from "~/server/avatar-storage.server";
import { Route } from "./+types/avatar";

export async function loader({ request, params }: Route.ActionArgs) {
  const storageKey = getStorageKey(params.id);
  const file = await fileStorage.get(storageKey);

  if (!file) {
    throw new Response("Not found", { status: 404 });
  }

  return new Response(file.stream(), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `inline; filename="${file.name}"`,
    },
  });
}
