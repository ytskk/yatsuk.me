import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration,} from "@remix-run/react";
import tailwindStyles from "./styles/app.css";
import NavBar from "~/components/NavBar";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Yatsuk",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStyles }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar/>
        <Outlet/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
