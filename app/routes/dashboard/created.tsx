import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";

import { getMaterialListItems } from "~/models/material.server";
import { requireUserId } from "~/session.server";
import { Route } from "./+types/created";

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  const materials = await getMaterialListItems({ userId });
  return { materials };
}

export default function MaterialList({ loaderData }: Route.ComponentProps) {
  const { materials } = loaderData;

  if (!materials.length) {
    return <Text>No materials found</Text>;
  }

  return (
    <>
      <Text mb="md" size="lg">
        Your uploaded materials
      </Text>
      <SimpleGrid cols={3} spacing="lg">
        {materials.map((material) => (
          <Card
            key={material.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src={"https://via.placeholder.com/150"}
                height={160}
                alt={material.title}
              />
            </Card.Section>

            <Group mt="md" mb="xs">
              <Text>{material.title}</Text>
              <Badge color="teal">{material.category.name}</Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {material.description}
            </Text>

            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Material
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
