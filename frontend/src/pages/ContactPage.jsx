import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F0F9FA] font-sans text-slate-700 p-2">
      {/* Hero Header */}
      <div className="text-center mt-16 mb-12 px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h1>
        <p className="max-w-2xl mx-auto text-slate-500 leading-relaxed">
          We'll create high-quality linkable content and build at least 40
          high-authority links to each asset, paving the way for you to grow
          your rankings, improve brand.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className=" max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row mb-20">
        {/* Left Side: Contact Info */}
        <div className="md:w-2/5 bg-[#7fb6e7] p-6 md:p-10 text-white relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-teal-50 opacity-90 mb-10 text-sm leading-relaxed">
            We'll create high-quality linkable content and build at least 40
            high-authority.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="w-5 h-5 mt-1" />
              <div className="text-sm">
                <p>+8801779717686</p>
                <p>+988678363866</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5" />
              <p className="text-sm">Support@uprangly.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-5 h-5" />
              <p className="text-sm">New York, USA</p>
            </div>
            <div>
              <ul className="flex gap-4 mt-20">
                <li>
                  <a
                    href="https://www.facebook.com/tekunik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-gray-800 rounded-full hover:bg-blue-600 transition"
                  >
                    <FaFacebookF size={20} />
                  </a>
                </li>

                <li>
                  <a
                    href="https://twitter.com/tekunik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-gray-300 rounded-full hover:bg-sky-500 transition"
                  >
                    <FaTwitter size={20} />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/company/tekunik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-gray-800 rounded-full hover:bg-blue-700 transition"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/tekunik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-gray-800  hover:bg-pink-600 transition"
                  >
                    <FaInstagram size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Abstract Circle Shape */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-3/5 p-6 md:p-10 bg-white">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative border-b border-gray-200 py-2">
                <label className="block text-xs text-[#00A99D] font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none text-gray-800 pt-1"
                />
              </div>
              <div className="relative border-b border-gray-200 py-2">
                <label className="block text-xs text-[#00A99D] font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none text-gray-800 pt-1"
                />
              </div>
            </div>

            <div className="relative border-b border-gray-200 py-2">
              <label className="block text-xs text-[#00A99D] font-medium">
                Your Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full focus:outline-none text-gray-800 pt-1"
              />
            </div>

            <div className="relative border-b border-gray-200 py-2">
              <label className="block text-xs text-[#00A99D] font-medium mb-1">
                Message
              </label>
              <textarea
                placeholder="Write here your message"
                className="w-full focus:outline-none text-gray-400 pt-1 resize-none h-20"
              />
            </div>

            <button
              type="submit"
              className="bg-[#00A99D] text-white px-8 py-3 rounded-md font-medium text-sm hover:bg-[#008c82] transition shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
