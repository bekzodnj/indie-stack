import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
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

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const categories = await getCategories();
  return data(categories);
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log("Updates", updates);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const url = formData.get("url") as string;

  // Validation

  const material = await createMaterial({
    title,
    description,
    categoryId,
    url: url?.toString() || null,
    userId,
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
      <Form method="post">
        <TextInput
          withAsterisk
          name="title"
          label="Your new page title"
          placeholder="Awesome page"
          mb="md"
        />

        <Autocomplete
          name="categoryId"
          label="What is this page about?"
          placeholder="Pick value or enter anything"
          data={categoryData}
          mb="md"
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

        <Checkbox mb="md" name="isPublished" label="Publish the page" />

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
