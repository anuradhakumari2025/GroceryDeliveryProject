import React from "react";
import { assets, footerLinks } from "../assets/greencart_assets/assets";
import { data } from "react-router";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/10 mt-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img src={assets.logo} className="w-34 md:w-32" alt="" />
          <p className="max-w-[410px] mt-6">
          At FreshBasket, we’re committed to delivering the highest quality groceries straight to your doorstep — fresh produce, trusted brands, and everyday essentials, all at your fingertips
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 ">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2 ">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © Anuradha All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
