import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Event from "./page/Event";
import CreateEvent from "./page/CreateEvent";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/app/Header";
import Admin from "./page/admin/Admin";
import { Toaster } from "@/components/ui/sonner"
import Events from "./page/admin/Events";
import ListMembers from "./page/admin/ListMembers";
import Notice from "./page/admin/Notice";
import Result from "./page/admin/Result";
import Membership from "./page/admin/Membership";
import Merchandise from "./page/admin/Merchandise";
import Dashboard from "./page/admin/Dashboard";
// import Footer from "./components/app/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow">
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />

            <Route path="/admin" element={<Admin/>} />
            <Route path="/admin/dashboard" element={<Dashboard/>} />
            <Route path="/admin/events" element={<Events/>} />
            <Route path="/admin/list-members" element={<ListMembers/>} />
            <Route path="/admin/membership" element={<Membership/>} />
            <Route path="/admin/notice" element={<Notice/>} />
            <Route path="/admin/results" element={<Result/>} />
            <Route path="/admin/merchandise" element={<Merchandise/>} />

            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
