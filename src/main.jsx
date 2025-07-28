import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import AuthProviders from "./Providers/AuthProviders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthProviders>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
