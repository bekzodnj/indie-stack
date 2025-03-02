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
    route("test", "routes/test.tsx"),
  ]),

  //dashboard
  route("dashboard", "routes/dashboard/layout.tsx", [
    index("./routes/dashboard/home.tsx"),
    route("new", "routes/dashboard/new.tsx"),
    route(":material", "routes/dashboard/$materialId.tsx"),
    route("created", "routes/dashboard/created.tsx"),
    route("saved", "routes/dashboard/saved.tsx"),
  ]),

  //upload
  route("user/:id", "pages/user-profile.tsx", [
    route("avatar", "api/avatar.tsx"),
  ]),

  route("logout", "routes/logout.tsx"),
  route("join", "routes/join.tsx"),
  route("healthcheck", "routes/healthcheck.tsx"),

  route("api/auth/*", "routes/api/auth.tsx"),
] satisfies RouteConfig;
