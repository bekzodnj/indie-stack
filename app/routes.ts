import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  //   index("home/route.tsx"),
  //   route("about", "about/route.tsx"),
  //   layout("concerts/layout.tsx", [
  //     route("trending", "concerts/trending.tsx"),
  //     route(":city", "concerts/city.tsx"),
  //   ]),
] satisfies RouteConfig;
