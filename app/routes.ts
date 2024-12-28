import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),

  // new sign-in
  route("signup", "routes/auth/signup.tsx"),

  route("login", "routes/login.tsx"),

  route("notes", "routes/notes.tsx", [
    index("./routes/notes.home.tsx"),
    route("new", "routes/notes.new.tsx"),
    route(":noteId", "routes/notes.$noteId.tsx"),
  ]),

  route("logout", "routes/logout.tsx"),
  route("join", "routes/join.tsx"),
  route("healthcheck", "routes/healthcheck.tsx"),

  route("api/auth/*", "routes/api/auth.tsx"),
] satisfies RouteConfig;
