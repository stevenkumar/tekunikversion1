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
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight pb-1">
                <span
                    className="bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--color-gray-900),var(--color-gray-900),var(--color-brand-green),var(--color-gray-900),var(--color-gray-900))] bg-size-[200%_auto] animate-shine "
                >
                    Our Tech Stack
                </span>
            </h1>
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
