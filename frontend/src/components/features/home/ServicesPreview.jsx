/*

import { Link } from "react-router-dom";
import { services } from "@/data/servicesData";

export default function ServicesPreview() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                Section Header
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Expertise
                    </h2>
                    <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our Services
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Complete digital solutions under one roof, tailored for growth.
                    </p>
                </div>

                Services Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <Link
                                key={index}
                                This navigates to your separate Services page 
                                and passes the service title as a URL parameter
                                to={`/services?service=${encodeURIComponent(service.title)}`}
                                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
                                    hover:shadow-2xl hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-300 cursor-pointer block"
                            >
                                <div
                                    className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6
                                    group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className={service.color} size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-green transition-colors">
                                    {service.title}
                                </h3>

                                MODIFIED: Added line-clamp-3 to show only a short preview
                                <p className="text-gray-600 leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                                
                                <span className="mt-4 inline-block text-brand-green font-medium text-sm group-hover:underline">
                                    Learn more →
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}*/


import { Link } from "react-router-dom";
import { services } from "@/data/servicesData";

export default function ServicesPreview() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Expertise
                    </h2>
                    <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our Services
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        Complete digital solutions under one roof, tailored for growth.
                    </p>
                </div>

                {/* Services Grid - Sliced to show only 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.slice(0, 3).map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <Link
                                key={index}
                                to={`/services?service=${encodeURIComponent(service.title)}`}
                                className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
                                    hover:shadow-2xl hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-300 cursor-pointer block"
                            >
                                <div
                                    className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6
                                    group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className={service.color} size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-green transition-colors">
                                    {service.title}
                                </h3>

                                {/* Show only short description */}
                                <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                                    {service.description}
                                </p>

                                <span className="mt-6 inline-block text-brand-green font-semibold text-sm group-hover:underline">
                                    Learn more →
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="flex items-center justify-center mt-10">
                <Link
                    to="/services"
                    className=" border border-brand-green text-brand-green px-8 py-3 rounded-full font-medium
        hover:bg-brand-green/5 transition duration-300"
                >
                    View Services
                </Link>
            </div>
        </section>
    );
}