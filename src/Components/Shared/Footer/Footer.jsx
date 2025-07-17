import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-11/12 mx-auto py-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="">
            <Logo></Logo>
            <p className="text-white/70 mt-4">
              Transform your fitness journey with our AI-powered platform.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#">
                <Linkedin className="h-6 w-6 text-white/70" />
              </a>
              <a href="#">
                <Github className="h-6 w-6 text-white/70" />
              </a>
              <a href="#">
                <Facebook className="h-6 w-6 text-white/70" />
              </a>
              <a href="#">
                <Instagram className="h-6 w-6 text-white/70" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              {["Features", "Pricing", "API", "Mobile App"].map((item) => (
                <Link
                  key={item}
                  to={"#"}
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              {["Help Center", "Community", "Privacy", "Terms"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
          <p>&copy; 2024 FitTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
