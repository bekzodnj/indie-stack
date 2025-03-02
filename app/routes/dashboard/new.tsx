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
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { createMaterial } from "~/models/material.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  //await requireUserId(request)
  return { name: "test" };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

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
          data={["Math", "Physics", "Programming", "Other"]}
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
