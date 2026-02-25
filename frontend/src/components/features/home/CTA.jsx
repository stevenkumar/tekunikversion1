import { Link } from "react-router-dom";

export default function CTA() {
    return (
        <section className="py-20 bg-brand-green/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Have a Project in Mind?
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Let’s build something meaningful and scalable together. From idea
                        to execution — we’ve got you covered.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center bg-brand-green text-white px-8 py-3 rounded-full font-medium
        hover:bg-brand-green/90 transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Contact Us
                        </Link>

                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center border border-brand-green text-brand-green px-8 py-3 rounded-full font-medium
        hover:bg-brand-green/5 transition duration-300"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
