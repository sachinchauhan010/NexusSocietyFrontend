import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/app/Header";
import Events from "./page/admin/Events";
import ListMembers from "./page/admin/ListMembers";
import Notice from "./page/admin/Notice";
import Result from "./page/admin/Result";
import Membership from "./page/admin/Membership";
import Merchandise from "./page/admin/Merchandise";
import Dashboard from "./page/admin/Dashboard";
import Footer from "./components/app/Footer.tsx";
import AdminSidebar from "./components/app/Admin/Sidebar.tsx";
import { Toaster } from "@/components/ui/sonner";
import AdminProtected from "./components/AdminProtected.tsx";
import Broadcast from "./page/admin/Broadcast.tsx";
import CreateEvent from "./components/app/Admin/Events/CreateEvent.tsx";
import EventDetail from "./components/app/Admin/Events/EventDetail.tsx";
import About from "./page/About.tsx";
import FAQs from "./page/FAQs.tsx";
import GetInTouch from "./page/GetInTouch.tsx";
import Services from "./page/Services.tsx";
import ErrorPage from "./page/ErrorPage.tsx";
import UserEvent from "./page/EventDetails.tsx";
import ParticularNotice from "./components/app/Notice/ParticularNotice.tsx";
import AllUserEvents from "./page/AllUserEvents.tsx";
import ProductDetail from "./components/app/Product/ProductDetail.tsx";
import AllUserMerchandise from "./page/AllUserMerchandize.tsx";

const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-purple-100">
          <Header />
          <main className="flex-grow px-6 py-2 min-h-screen">
            <Outlet />
            <Toaster />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/event",
        element: <AllUserEvents />,
      },
      {
        path: "/merchandise/:id",
        element: <ProductDetail />,
      },
      {
        path: "/get-merchandise",
        element: <AllUserMerchandise />,
      },
      {
        path: "/event/:id",
        element: <UserEvent />,
      },
      {
        path: "/notice/:id",
        element: <ParticularNotice />,
      },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/faq",
        element: <FAQs />,
      },
      {
        path: "/get-in-touch",
        element: <GetInTouch />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      // Admin routes as nested routes
      {
        path: "admin",
        element: (
          <AdminProtected>
            <AdminSidebar />
          </AdminProtected>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "events",
            element: <Events />,
          },
          {
            path: "events/:eventId",
            element: <EventDetail />,
          },
          {
            path: "create/events",
            element: <CreateEvent />,
          },
          {
            path: "list-members",
            element: <ListMembers />,
          },
          {
            path: "membership",
            element: <Membership />,
          },
          {
            path: "broadcast",
            element: <Broadcast />,
          },
          {
            path: "notice",
            element: <Notice />,
          },
          {
            path: "results",
            element: <Result />,
          },
          {
            path: "merchandise",
            element: <Merchandise />,
          },
        ],
      },
    ],
  },
  // Catch-all route for 404 error, rendered outside of AppLayout
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
