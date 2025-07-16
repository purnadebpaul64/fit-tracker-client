import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import AuthProviders from "./Providers/AuthProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router}></RouterProvider>
    </AuthProviders>
  </StrictMode>
);
