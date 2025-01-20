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

import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  //await requireUserId(request)
  return { name: "test" };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  //const userId = await getUserSession(request);
  const user = useUser();

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const title = formData.get("title");
  const content = formData.get("content");
  const thumbnail = formData.get("thumbnail");
  const categories = formData.get("categories");
  const pageLink = formData.get("pageLink") as string;

  console.log("FORMA", updates);

  if (typeof title !== "string" || title.length === 0) {
    return data({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof content !== "string" || content.length === 0) {
    return data(
      { errors: { content: "Content is required" } },
      { status: 400 },
    );
  }

  const categoryArray =
    typeof categories === "string"
      ? categories
          .split(",")
          .map((cat) => cat.trim())
          .filter(Boolean)
      : [];

  //TODO - createPage
  //   const page = await createPage(
  //     {
  //       title,
  //       content,
  //       thumbnail: typeof thumbnail === "string" ? thumbnail : undefined,
  //       categories: categoryArray,
  //       pageLink,
  //     },
  //     user.id as string,
  //   );

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
          name="category"
          label="What is this page about?"
          placeholder="Pick value or enter anything"
          data={["Math", "Physics", "Programming", "Other"]}
          mb="md"
        />

        <Textarea
          name="content"
          placeholder="Description for your page"
          label="Awesome new page"
          autosize
          minRows={4}
          mb="md"
        />

        <TextInput
          withAsterisk
          name="pageLink"
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
