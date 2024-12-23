import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold">NewsChannel</h2>
          <p className="mt-4 text-gray-400">
            Stay updated with the latest news from around the world. Reliable,
            trusted, and unbiased reporting.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 list-none">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sports" className="text-gray-400 hover:text-white">
                Sports
              </Link>
            </li>
            <li>
              <Link to="/technology" className="text-gray-400 hover:text-white">
                Technology
              </Link>
            </li>
            <li>
              <Link to="/trading" className="text-gray-400 hover:text-white">
                Trading
              </Link>
            </li>
            <li>
              <Link to="/cricket" className="text-gray-400 hover:text-white">
                Cricket
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <ul className="mt-4 space-y-2 list-none">
            <li>
              <span className="text-gray-400">Email:</span>{' '}
              <a
                href="mailto:support@newschannel.com"
                className="text-gray-400 hover:text-white"
              >
                support@headlinebuzz.com
              </a>
            </li>
            <li>
              <span className="text-gray-400">Phone:</span>{' '}
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-white"
              >
                +1 234 567 890
              </a>
            </li>
            <li>
              <span className="text-gray-400">Address:</span>{' '}
              <span className="text-gray-400">123 News St, Manglore</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} NewsChannel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
