import {
  Button,
  Checkbox,
  Container,
  FileInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";

import {
  data,
  Form,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { createMaterial, getCategories } from "~/models/material.server";
import { requireUserId } from "~/session.server";
import { fileStorage, getStorageKey } from "~/server/storage.server";
import { FileUpload, parseFormData } from "@mjackson/form-data-parser";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const categories = await getCategories();
  return data(categories);
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const cloneReq = request.clone();
  const formDataCopy = await cloneReq.formData();
  const fileAttachment = formDataCopy.get("fileAttachment") as File | undefined;

  let fileName = fileAttachment?.name.replace(/\s+/g, "_") || "default";

  const pdfUploadHandler = async (fileUpload: FileUpload) => {
    if (
      fileUpload.fieldName === "fileAttachment" &&
      ["application/pdf", "image/jpeg", "image/png"].includes(fileUpload.type)
    ) {
      const storageKey = getStorageKey(userId, fileName as string);
      await fileStorage.set(storageKey, fileUpload);
      console.log("processed:", fileStorage.get(storageKey));
    }
  };

  const formData = await parseFormData(request, pdfUploadHandler);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const url = formData.get("url") as string;

  await createMaterial({
    title,
    description,
    categoryId,
    url: url?.toString() || null,
    userId,
    filePath: getStorageKey(userId, fileName as string),
  });

  return redirect(`/dashboard`);
};

export default function CreatePage() {
  const data = useLoaderData<typeof loader>();

  const categoryData = data.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  return (
    <Container size={"sm"}>
      <Form method="POST" encType="multipart/form-data">
        <TextInput
          required
          withAsterisk
          name="title"
          label="Your new page title"
          placeholder="Awesome page"
          mb="md"
        />

        <Select
          name="categoryId"
          withAsterisk
          required
          label="What is this page about?"
          placeholder="Pick value or enter anything"
          data={categoryData}
          mb="md"
          searchable
        />

        <Textarea
          name="description"
          placeholder="Description for your page"
          label="Awesome new page"
          autosize
          minRows={4}
          mb="md"
        />

        <TextInput
          withAsterisk
          name="url"
          label="Page link or URL"
          placeholder="Website Link or URL"
          mb="md"
        />

        <FileInput
          name="fileAttachment"
          label="Upload a PDF file"
          placeholder="Upload pdf, jpg, or png files"
          mb="md"
          accept="application/pdf, image/jpeg, image/png"
        />

        <Checkbox mb="md" name="isPublished" label="Publish the page" />

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
