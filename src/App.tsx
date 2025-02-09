import { Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Event from "./page/Event";
import CreateEvent from "./page/CreateEvent";

import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/app/Footer";
import Header from "@/components/app/Header";

import { Toaster } from "@/components/ui/sonner"
import Society from "./page/headAdmin/Society";
import RegisterSociety from "./page/headAdmin/RegisterSociety";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow">
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/society" element={<Society />} />
            <Route path="/society/register-society" element={<RegisterSociety />} />
            <Route path="/event" element={<Event />} />
            <Route path="/create-event" element={<CreateEvent />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
