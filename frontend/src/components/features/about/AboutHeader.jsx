export default function AboutHeader() {
    return (
        <div className="text-center max-w-8xl mx-auto mb-16 ">
            {/* Small Label */}
            <p className="text-brand-green font-bold tracking-widest uppercase text-xs mb-4">
                About Tekunik
            </p>

            {/* H1: Animated Shimmer Gradient */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight pb-1">
                <span
                    className="bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--color-gray-900),var(--color-gray-900),var(--color-brand-green),var(--color-gray-900),var(--color-gray-900))] bg-size-[200%_auto] animate-shine "
                >
                    We create digital<br /> solutions that feel premium and perform fast.
                </span>
            </h1>

            {/* Paragraph: Hover Color Change */}
            <p className="mt-4 text-gray-600 text-lg max-w-6xl mx-auto leading-relaxed text-left md:text-center lg:text-left">
                We help startups and businesses build modern websites, apps, and digital
                products with a focus on performance, UI, and long-term growth.
                At TekUnik, we thrive on the philosophy of embracing change to stay ahead in a rapidly evolving digital landscape. As one of the fastest-growing digital marketing agencies based in Mumbai and serving a global clientele, we provide highly effective multi-channel and multi-platform internet marketing services. Our mission is to ensure your brand, products, and services achieve their maximum market reach and potential through strategic digital placement and innovative execution.

                We take immense pride in delivering intelligent designs and engaging experiences for clients across the world, fueled by a passion for problem-solving and a commitment to finding the best possible digital solutions. Our team is a dedicated collective of tech-driven specialists and creative fanatics who cover every essential aspect of the digital realm. From expert graphic designers and web developers to precise project and account management, we offer a full marketing suite determined to elevate your brand to the top.
            </p>
        </div>
    );
}