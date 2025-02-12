import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook } from "lucide-react";

// Navigation links
const navLinks = ["Home", "About", "Services", "Get in touch", "FAQs"];

// Social Media Links
const socialLinks = [
  { id: 1, icon: <Linkedin size={20} />, url: "https://linkedin.com" },
  { id: 2, icon: <Instagram size={20} />, url: "https://instagram.com" },
  { id: 3, icon: <Facebook size={20} />, url: "https://facebook.com" },
];


const Footer = () => {
  return (
    <footer className="bg-[#0A0A5A] text-white py-8 px-6 md:px-16"> 
      {/* Logo and Subscription */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-white">
          Nexus <span className="text-purple-400">Society</span>
        </h1>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your mail"
            className="w-64 bg-white text-black px-4 py-2 rounded-md"
          />
          <Button className="bg-purple-500 hover:bg-purple-600 px-6 rounded-md">
            Subscribe
          </Button>
        </div>
      </div>

      <nav className="flex justify-center mt-6 gap-6 text-sm">
        {navLinks.map((link, index) => (
          <Link key={index} to={`/${link.toLowerCase().replace(" ", "-")}`} className="hover:underline">
            {link}
          </Link>
        ))}
      </nav>

      <hr className="border-white/30 my-4 w-3/4 mx-auto" />

      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a key={social.id} href={social.url} className="text-white hover:text-gray-300" target="_blank" rel="noopener noreferrer">
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm mt-4 text-gray-300">
        Non Copyrighted © 2023 Upload by rich technologies
      </p>
    </footer>
  );
};

export default Footer;
