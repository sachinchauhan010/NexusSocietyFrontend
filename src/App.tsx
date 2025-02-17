import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Event from "./page/Event";
import CreateEvent from "./page/CreateEvent";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/app/Header";
import Admin from "./page/admin/Admin";
import { Toaster } from "@/components/ui/sonner"
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
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
