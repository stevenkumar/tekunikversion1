import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss, SiNextdotjs, SiFirebase } from "react-icons/si";

import { MdDesignServices, MdApi } from "react-icons/md"; // MdApi is good for REST APIs

export default function TechStack() {
    const tech = [
        { name: "React", icon: <FaReact className="text-blue-500 text-xl" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-xl" /> },
        { name: "Express", icon: <SiExpress className="text-gray-500 text-xl" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-xl" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500 text-xl" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-black text-xl" /> },
        { name: "Firebase", icon: <SiFirebase className="text-yellow-500 text-xl" /> },
        { name: "AWS", icon: <FaAws className="text-orange-500 text-xl" /> },
        { name: "REST APIs", icon: <MdApi className="text-purple-500 text-xl" /> },
        { name: "UI/UX", icon: <MdDesignServices className="text-pink-500 text-xl" /> },
    ];

    return (
        <div>
            <div className="text-center max-w-3xl mx-auto py-12">
                <p className="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
                    Technologies
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Our Tech Stack
                </h2>
                <p className="text-gray-600 mt-4 text-lg">
                    We use modern technologies to build fast, secure, and scalable products.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
                {tech.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-white px-6 py-4 rounded-xl text-gray-700 border border-gray-200 shadow-sm
                        hover:shadow-lg hover:-translate-y-1 hover:border-brand-green hover:text-brand-green transition-all duration-300 cursor-pointer group"
                    >
                        <div className="mb-2 text-3xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
