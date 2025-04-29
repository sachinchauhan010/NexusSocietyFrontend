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
import SecondaryHeader from "./components/app/SecondaryHeader.tsx";

import UserApplyEvents from "./components/app/Profile/UserApplyEvents.tsx";
import UserProfileHome from "./components/app/Profile/UserProfileHome.tsx";
import UserOrderProducts from "./components/app/Profile/UserOrderProducts.tsx";
import UserSidebar from "./components/app/Profile/UserSidebar.tsx";
// import { Separator } from "./components/ui/separator.tsx";
import ForgetPassword from "./components/app/Auth/forget-password.tsx";
import ResetPassword from "./components/app/Auth/resetPassword.tsx";
import OfficialBearer from "./components/app/Admin/member/OfficialBearer.tsx";


const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-purple-100 font-playwrite">
          <Header />
          <div className="mx-auto font-playwrite">
          <SecondaryHeader />
          </div>
          {/* <Separator/> */}
          <main className="flex-grow px-2 sm:px-4 md:px-6 py-2 min-h-screen font-playwrite">
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
        path: "/profile/home",
        element: <UserProfileHome/>,
      },
      {
        path: "/faq",
        element: <FAQs />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
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
            path: "official-bearers",
            element: <OfficialBearer />,
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

      {
        path: "/profile",
        element: <UserSidebar />,
        children: [
          { index: true, element: <UserProfileHome /> },
          { path: "home", element: <UserProfileHome /> },
          { path: "apply-events", element: <UserApplyEvents /> },
          { path: "orders", element: <UserOrderProducts /> },
          {
            path: "notifications",
            element: <div>Notifications Page Coming Soon</div>,
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
