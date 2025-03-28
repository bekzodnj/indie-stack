import type { LoaderFunctionArgs } from "react-router";
import { Form, Link, NavLink, Outlet, useLoaderData } from "react-router";
import { Badge, NavLink as NavLinkMantine } from "@mantine/core";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return { noteListItems };
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Udenote</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <NavLink
            className={({ isActive }) =>
              `block border-b p-5 text-xl ${isActive ? "bg-white" : ""}`
            }
            to={"new"}
          >
            Create New Material
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `block border-b p-5 text-xl ${isActive ? "bg-white" : ""}`
            }
            to={"created"}
          >
            My Materials
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `block border-b p-5 text-xl ${isActive ? "bg-white" : ""}`
            }
            to={"saved"}
          >
            Saved Materials
          </NavLink>

          <hr />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
