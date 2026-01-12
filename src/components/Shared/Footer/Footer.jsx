// import React from "react";
// import { Link } from "react-router";
// import logo from "../../../assets/logo.png";
// import { Twitter, Youtube, Facebook } from "lucide-react";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative bg-black/90 text-gray-300 overflow-hidden">
//       {/* Subtle background overlay */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%)] pointer-events-none" />

//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
//           {/* Brand & Description */}
//           <div className="space-y-6">
//             <Link to="/" className="flex items-center gap-3">
//               <img
//                 src={logo}
//                 alt="Garments Tracker Logo"
//                 className="w-14 h-14 rounded-full shadow-lg border-2 border-indigo-500/30"
//               />
//               <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Garments Tracker
//               </span>
//             </Link>

//             <p className="text-gray-400 leading-relaxed max-w-sm">
//               A modern, real-time garment management platform empowering factories with transparency, efficiency, and
//               global connectivity.
//             </p>

//             <p className="text-sm text-gray-500">© {currentYear} Garments Tracker. All rights reserved.</p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Quick Links</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/allProducts" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about-us" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/blog" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
//                   Blog
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Support</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link to="/" className="hover:text-indigo-400 transition-colors">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/terms-conditions" className="hover:text-indigo-400 transition-colors">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <a href="mailto:support@garmentstracker.com" className="hover:text-indigo-400 transition-colors">
//                   support@garmentstracker.com
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Social & Newsletter */}
//           {/* Social & Newsletter */}
// <div className="space-y-6">
//   <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Follow Us</h3>
  
//   {/* Social Icons - Updated with LinkedIn, GitHub, Facebook, Twitter */}
//   <div className="flex gap-6">
//     <a 
//       href="https://www.linkedin.com/company/garments-tracker" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="text-gray-400 hover:text-[#0A66C2] transition-colors transform hover:scale-110 duration-300"
//       aria-label="LinkedIn"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.039c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z"/>
//       </svg>
//     </a>

//     <a 
//       href="https://github.com/garments-tracker" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
//       aria-label="GitHub"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//       </svg>
//     </a>

//     <a 
//       href="https://www.facebook.com/garmentstracker" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="text-gray-400 hover:text-[#1877F2] transition-colors transform hover:scale-110 duration-300"
//       aria-label="Facebook"
//     >
//       <Facebook size={28} />
//     </a>

//     <a 
//       href="https://twitter.com/garmentstracker" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="text-gray-400 hover:text-[#1DA1F2] transition-colors transform hover:scale-110 duration-300"
//       aria-label="Twitter"
//     >
//       <Twitter size={28} />
//     </a>
//   </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-10 border-t border-white/10 text-center text-sm text-gray-500">
//           <p>Made with precision for the global garment industry • Dhaka, Bangladesh</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";
import { Twitter, Facebook, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/90 text-gray-300 overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Garments Tracker Logo"
                className="w-14 h-14 rounded-full shadow-lg border-2 border-indigo-500/30"
              />
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Garments Tracker
              </span>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              A modern, real-time garment management platform empowering factories with transparency, efficiency, and global connectivity.
            </p>

            <p className="text-sm text-gray-500">
              © {currentYear} Garments Tracker. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allProducts" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-indigo-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="mailto:islamjuma324@gmail.com" className="hover:text-indigo-400 transition-colors">
                  islamjuma324@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links - Only LinkedIn, GitHub, Facebook, Twitter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">Follow Us</h3>
            
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/juma-islam/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0A66C2] transition-colors transform hover:scale-110 duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>

              <a 
                href="https://github.com/Juma-islam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                aria-label="GitHub"
              >
                <Github size={28} />
              </a>

              <a 
                href="https://www.facebook.com/ononna.islam.juma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition-colors transform hover:scale-110 duration-300"
                aria-label="Facebook"
              >
                <Facebook size={28} />
              </a>

              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1DA1F2] transition-colors transform hover:scale-110 duration-300"
                aria-label="Twitter"
              >
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-white/10 text-center text-sm text-gray-500">
          <p>Made with precision for the global garment industry • Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;