import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),

  layout("routes/notes.tsx", [
    index("./routes/notes.home.tsx"),
    route("new", "routes/notes.new.tsx"),
    route(":noteId", "routes/notes.$noteId.tsx"),
  ]),

  route("logout", "routes/logout.tsx"),
  route("healthcheck", "routes/healthcheck.tsx"),
] satisfies RouteConfig;
