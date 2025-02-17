import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


import Event from "./page/Event";
import CreateEvent from "./page/CreateEvent";
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
import Footer from './components/app/Footer.tsx'
import { AdminSidebar } from './components/app/Admin/Sidebar.tsx'

const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div className='min-h-screen'>
          <Header />
          <main className='px-6 py-2'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/event",
        element: <Event />
      },
      {
        path: "/create-event",
        element: <CreateEvent />
      },
      // Admin routes as nested routes
      {
        path: "admin",
        element: <AdminSidebar />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "events",
            element: <Events />
          },
          {
            path: "list-members",
            element: <ListMembers />
          },
          {
            path: "membership",
            element: <Membership />
          },
          {
            path: "notice",
            element: <Notice />
          },
          {
            path: "results",
            element: <Result />
          },
          {
            path: "merchandise",
            element: <Merchandise />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
)
