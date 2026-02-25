import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { submitContactForm } from "../services/api";
import usePageMeta from "../hooks/usePageMeta";

const ContactPageV2 = () => {
    usePageMeta('Contact Us', 'Get in touch with Tekunik. We are here to help you with your digital needs.');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await submitContactForm(formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            // Reset success message after 5 seconds
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || "Failed to send message" });
        }
    };

    return (
        <div className="min-h-screen bg-brand-cyan/5 font-sans text-slate-700 p-2 mt-8 md:p-6 lg:p-12">
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
                <div className="md:w-2/5 bg-brand-cyan p-6 md:p-10 text-white relative overflow-hidden">
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
                            <ul className="flex gap-4 mt-10">
                                <li>
                                    <a
                                        href="https://www.facebook.com/tekunik"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" bg-gray-800 rounded-full hover:bg-brand-green transition"
                                    >
                                        <FaFacebookF size={20} />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://twitter.com/tekunik"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" bg-gray-800 rounded-full hover:bg-brand-green transition"
                                    >
                                        <FaTwitter size={20} />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/tekunik/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" bg-gray-800 rounded-full hover:bg-brand-green transition"
                                    >
                                        <FaLinkedinIn size={20} />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.instagram.com/tekunik/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=" bg-gray-800  hover:bg-brand-green transition"
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
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative border-b border-gray-200 py-2">
                                <label className="block text-xs text-brand-green font-medium">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full focus:outline-none text-gray-800 pt-1"
                                />
                            </div>
                            <div className="relative border-b border-gray-200 py-2">
                                <label className="block text-xs text-brand-green font-medium">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full focus:outline-none text-gray-800 pt-1"
                                />
                            </div>
                        </div>

                        <div className="relative border-b border-gray-200 py-2">
                            <label className="block text-xs text-brand-green font-medium">
                                Your Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full focus:outline-none text-gray-800 pt-1"
                            />
                        </div>

                        <div className="relative border-b border-gray-200 py-2">
                            <label className="block text-xs text-brand-green font-medium mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Write here your message"
                                className="w-full focus:outline-none text-gray-600 pt-1 resize-none h-20"
                            />
                        </div>

                        {status.error && (
                            <div className="text-red-500 text-sm mb-4">{status.error}</div>
                        )}

                        {status.success && (
                            <div className="text-teal-600 text-sm mb-4 font-semibold">Message sent successfully!</div>
                        )}

                        <button
                            type="submit"
                            disabled={status.loading}
                            className={`bg-brand-green text-white px-8 py-3 rounded-md font-medium text-sm transition shadow-md ${status.loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-cyan'}`}
                        >
                            {status.loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPageV2;
