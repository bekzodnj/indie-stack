import {
  Autocomplete,
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
import invariant from "tiny-invariant";
import {
  fileStorage,
  getStorageKey,
  pdfUploadHandler,
} from "~/server/avatar-storage.server";
import { FileUpload, parseFormData } from "@mjackson/form-data-parser";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const categories = await getCategories();
  return data(categories);
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const pdfUploadHandler = (fileUpload: FileUpload) => {
    if (
      fileUpload.fieldName === "file" &&
      fileUpload.type === "application/pdf"
    ) {
      const storageKey = getStorageKey(userId);
      fileStorage.set(storageKey, fileUpload);
      return fileStorage.get(storageKey);
    }
  };

  const formData = await parseFormData(request, pdfUploadHandler);

  //const updates = Object.fromEntries(formData);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const url = formData.get("url") as string;

  const material = await createMaterial({
    title,
    description,
    categoryId,
    url: url?.toString() || null,
    userId,
    filePath: getStorageKey(userId),
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

  console.log("Category Data", data);

  return (
    <Container size={"sm"}>
      <Form method="post">
        <TextInput
          withAsterisk
          name="title"
          label="Your new page title"
          placeholder="Awesome page"
          mb="md"
        />

        <Select
          name="categoryId"
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
          name="pdfFile"
          label="Upload a PDF file"
          placeholder="PDF file"
          mb="md"
        />

        <Checkbox mb="md" name="isPublished" label="Publish the page" />

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
