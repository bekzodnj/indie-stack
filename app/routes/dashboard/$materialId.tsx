import { getMaterial } from "~/models/material.server";
import { Route } from "./+types/$materialId";
import { requireUserId } from "~/session.server";
import { Anchor, Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router";

export async function loader({ params, request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const material = await getMaterial({ id: params.materialId, userId: userId });

  return { material };
}

export default function MaterialDetails({ loaderData }: Route.ComponentProps) {
  const { material } = loaderData;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md">
        <Group mb="xs">
          <Text size="lg">{material?.title}</Text>
          <Badge color="blue" variant="light">
            {material?.category.name}
          </Badge>
        </Group>

        <Text size="sm" mt="xs">
          {material?.description}
        </Text>

        {material?.filePath ? (
          <Link
            to={material.filePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Download Material
            </Button>
          </Link>
        ) : null}

        {material?.url ? (
          <Anchor
            href={material.url || ""}
            target="_blank"
            rel="noopener noreferrer"
            mt="md"
          >
            Visit Resource
          </Anchor>
        ) : null}
      </Card>
    </>
  );
}
