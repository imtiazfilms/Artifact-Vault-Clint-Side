import { useState, useEffect } from "react";

const Slider = () => {
    const slides = [
        {
            id: 1,
            img: "https://i.ibb.co.com/PGjCFVj/Gemini-Generated-Image-5tmvvm5tmvvm5tmv.jpg",
            title: "Discover Rare Artifacts",
            description: "Explore the world's most unique collections.",
        },
        {
            id: 2,
            img: "https://i.ibb.co.com/BTZ8mqJ/Gemini-Generated-Image-uyq7gfuyq7gfuyq7.jpg",
            title: "Preserve History",
            description: "Step into the stories of ancient times.",
        },
        {
            id: 3,
            img: "https://i.ibb.co.com/ck7cc68/Gemini-Generated-Image-pwvfjepwvfjepwvf.jpg",
            title: "Share Your Discoveries",
            description: "Join a community of passionate collectors.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-transform duration-1000 ${
                        index === currentSlide ? "translate-x-0" : "translate-x-full"
                    }`}
                    style={{ backgroundImage: `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                        <h1 className="text-4xl font-bold">{slide.title}</h1>
                        <p className="text-lg mt-2">{slide.description}</p>
                    </div>
                </div>
            ))}

            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full h-10 w-10 flex items-center justify-center"
            >
                &#8249;
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full h-10 w-10 flex items-center justify-center"
            >
                &#8250;
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 w-3 rounded-full ${
                            currentSlide === index ? "bg-white" : "bg-gray-500"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
