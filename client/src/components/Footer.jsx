import React from 'react';
import { assets, footer_data } from '../assets/assets';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="px-6 md:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo + Description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6">
            AiBLogApplication is a blog application that allows users to create, read, update, and delete blogs. It is built with React, Node.js, and MongoDB.
          </p>
        </div>

        {/* Link Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-base text-gray-900 w-full md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.url.startsWith('http') ? (
                      // External links (open in new tab)
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition"
                      >
                        {link.name}
                      </a>
                    ) : (
                      // Internal links using React Router
                      <Link to={link.url} className="hover:underline transition">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Note */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © 2025 AiBLogApplication — All Rights Reserved.
      </p>
    </div>
  );
}
