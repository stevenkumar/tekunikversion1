import { Link } from "react-router-dom";
import { Code, Smartphone, PenTool, ShoppingCart, Search, Wrench } from "lucide-react";

export default function ServicesPreview() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Expertise
                    </h2>
                    <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our Services
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Complete digital solutions under one roof, tailored for growth.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Web Development",
                            desc: "Fast, scalable and modern websites built with latest technologies.",
                            icon: <Code className="w-7 h-7 text-blue-600" />,
                            bg: "bg-blue-100",
                        },
                        {
                            title: "Mobile App Development",
                            desc: "High-performance Android & iOS apps for your business.",
                            icon: <Smartphone className="w-7 h-7 text-purple-600" />,
                            bg: "bg-purple-100",
                        },
                        {
                            title: "UI / UX Design",
                            desc: "User-centered designs that enhance engagement and conversion.",
                            icon: <PenTool className="w-7 h-7 text-pink-600" />,
                            bg: "bg-pink-100",
                        },
                        {
                            title: "E-Commerce Solutions",
                            desc: "Robust online stores with secure payment integrations.",
                            icon: <ShoppingCart className="w-7 h-7 text-emerald-600" />,
                            bg: "bg-emerald-100",
                        },
                        {
                            title: "SEO Optimization",
                            desc: "Improve visibility, traffic, and rankings on search engines.",
                            icon: <Search className="w-7 h-7 text-orange-600" />,
                            bg: "bg-orange-100",
                        },
                        {
                            title: "Maintenance & Support",
                            desc: "Ongoing support, updates, and performance optimization.",
                            icon: <Wrench className="w-7 h-7 text-indigo-600" />,
                            bg: "bg-indigo-100",
                        },
                    ].map((service, index) => (
                        <Link
                            key={index}
                            to={`/services?service=${encodeURIComponent(service.title)}`}
                            className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
        hover:shadow-xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 cursor-pointer block"
                        >
                            <div
                                className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6
          group-hover:scale-110 transition-transform duration-300`}
                            >
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
