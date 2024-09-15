import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import { render } from "react-dom"
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import "./index.css";
import Consult from "./components/Consult";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/Consult/:slug" element={<Consult />} />
            </Routes>
            {/* <App />
            <Route path="/about" element={<Consult />} /> */}
          </BrowserRouter>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
