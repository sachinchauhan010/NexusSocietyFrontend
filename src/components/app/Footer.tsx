// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { Linkedin, Instagram, Facebook } from "lucide-react";

// // Navigation links
// const navLinks = [
//   { name: "Home", url: "/" },
//   { name: "About", url: "/about" },
//   { name: "Services", url: "/services" },
//   { name: "Get in touch", url: "/get-in-touch" },
//   { name: "FAQs", url: "/faq" },
// ];

// // Social Media Links
// const socialLinks = [
//   { id: 1, icon: <Linkedin size={20} />, url: "https://linkedin.com" },
//   { id: 2, icon: <Instagram size={20} />, url: "https://instagram.com" },
//   { id: 3, icon: <Facebook size={20} />, url: "https://facebook.com" },
// ];

import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-12 px-2 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
              <Link to={"/"} className="flex items-center">
                <span className="transition-colors duration-300 px-2 rounded">
                  Nexus
                </span>
                <span className="text-purple-600 transition-colors duration-300 px-0 rounded">
                  Society
                </span>
              </Link>
            </h2>
            <div className="hidden gap-x-10 items-center font-semibold ml-auto">
              <Link className="hover:text-purple-500" to="/event">
                Events
              </Link>
              <Link className="hover:text-purple-500" to="/services">
                Services
              </Link>
              <Link className="hover:text-purple-500" to="/about">
                About us
              </Link>
              <Link className="hover:text-purple-500" to="/get-merchandise">
                Merchandise
              </Link>
              <Link className="hover:text-purple-500" to="/faq">
                FAQs
              </Link>
              <Link className="hover:text-purple-500" to="/get-in-touch">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-sm text-gray-300 mb-6">
              The purpose of a FAQ is generally to provide information on frequent questions or concerns. The purpose of
              a FAQ is generally to provide information on frequent questions or concerns.
            </p>
            <Link
              to="/get-in-touch"
              className="bg-purple-400 hover:bg-purple-500 text-black font-medium py-2 px-6 rounded-full w-fit text-sm"
            >
              Contact Now
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
          {/* Transparent section */}
          <div>
            <h3 className="font-bold mb-4">Transparent</h3>
            <div className="flex space-x-4">
              <Link to="#" aria-label="Instagram" className="hover:text-purple-700">
                <Instagram size={20} />
              </Link>
              <Link to="#" aria-label="Twitter" className="hover:text-purple-700">
                <Twitter size={20} />
              </Link>
              <Link to="#" aria-label="Facebook" className="hover:text-purple-700">
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Address section */}
          <div>
            <h3 className="font-bold mb-4">Address</h3>
            <address className="not-italic text-sm text-gray-300">
              MMMUT Gorakhpur
              <br />
              Uttar Pradesh,
              <br />
              India
            </address>
          </div>

          {/* Call us section */}
          <div>
            <h3 className="font-bold mb-4">Call us</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>+123 6789887</p>
              <p>+123 6789881</p>
              <p className="mt-4">nexussocietyofficial@gmail.com</p>
            </div>
          </div>

          {/* Our Policies section */}
          <div>
            <h3 className="font-bold mb-4">Our Policies</h3>
            <div className="space-y-2 text-sm">
              <p>
                <Link to="#" className="text-gray-300 hover:text-purple-700">
                  Privacy Policies
                </Link>
              </p>
              <p>
                <Link to="#" className="text-gray-300 hover:text-purple-700">
                  Terms of use
                </Link>
              </p>
              <p>
                <Link to="#" className="text-gray-300 hover:text-purple-700">
                  Refund Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
