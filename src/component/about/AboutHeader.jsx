export default function AboutHeader() {
    return (
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            {/* Small Label */}
            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4">
                About Tekunik
            </p>

            {/* H1: Animated Shimmer Gradient */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight pb-1">
                <span 
                    className="bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.gray.900),theme(colors.gray.900),theme(colors.blue.500),theme(colors.gray.900),theme(colors.gray.900))] bg-[length:200%_auto] animate-shine"
                >
                    We create digital solutions that feel premium and perform fast.
                </span>
            </h1>

            {/* Paragraph: Hover Color Change */}
            <p className="mt-4">
                We help startups and businesses build modern websites, apps, and digital
                products with a focus on performance, UI, and long-term growth.
            </p>
        </div>
    );
}