import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LineLiffProvider } from "./contexts/LineLiffContext";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from "./store";
import PrelineScript from "./PrelineScript";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const liffId = import.meta.env.VITE_LIFF_ID;

  return (
    <>
    <PrelineScript />
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <LineLiffProvider liffId={liffId}>
              <Outlet />
            </LineLiffProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
    
  );
}

export function HydrateFallback() {
  return <p></p>;
}
