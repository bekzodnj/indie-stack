import type { LinksFunction, LoaderFunctionArgs } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css?url";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { user: await getUser(request) };
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body className="h-full">
        <MantineProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </MantineProvider>
      </body>
    </html>
  );
}
