import { ShieldCheck, Rocket, Users, Sparkles } from "lucide-react";

export default function OurValues() {
    const values = [
        {
            title: "Quality First",
            desc: "We focus on clean UI, strong code, and long-term maintainability.",
            icon: <ShieldCheck className="w-7 h-7 text-brand-green" />,
            bg: "bg-brand-green/10",
        },
        {
            title: "Modern Approach",
            desc: "We use modern tools and best practices to keep your product future-ready.",
            icon: <Rocket className="w-7 h-7 text-brand-cyan" />,
            bg: "bg-brand-cyan/10",
        },
        {
            title: "Client Partnership",
            desc: "We work like your internal team — transparent, collaborative, and reliable.",
            icon: <Users className="w-7 h-7 text-brand-green" />,
            bg: "bg-brand-green/10",
        },
        {
            title: "Creative Thinking",
            desc: "We design experiences that are not only beautiful but also conversion-focused.",
            icon: <Sparkles className="w-7 h-7 text-brand-cyan" />,
            bg: "bg-brand-cyan/10",
        },
    ];

    return (
        <div className="my-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
                    What We Believe In
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Our Values
                </h2>
                <p className="text-gray-600 mt-4 text-lg">
                    We don’t just build projects — we build trust, quality, and long-term
                    partnerships.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
          hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <div
                            className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-6
            group-hover:scale-110 transition-transform duration-300`}
                        >
                            {item.icon}
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
