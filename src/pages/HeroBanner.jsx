import Slider from "react-slick";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slider = [
    {
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80",
        "title": "Cox's Bazar Beach Sunset",
        "description": "Watch the sun dip below the horizon at the world's longest natural sea beach."
    },
    {
        "image": "https://i.postimg.cc/jdh696wr/hill.jpg",
        "title": "Hill Tracks Adventure",
        "description": "Breathtaking sunrise over the lush Chittagong hill tracts — a hidden paradise."
    },
    {
        "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1500&q=80",
        "title": "Tea Garden Trails, Sreemangal",
        "description": "Get lost in the rolling hills of tea plantations and misty air of Sreemangal."
    },
    {
        "image": "https://i.postimg.cc/8PHyggJc/md-sameul-9-Uqze-QYk-Cgg-unsplash.jpg",
        "title": "Mystic Jaflong, Sylhet",
        "description": "Feel the serenity of crystal-clear riverbeds and green hills at the heart of Jaflong, Sylhet — a perfect escape into nature."
    },
    {
    "image": "https://i.postimg.cc/CLxFgYP6/Sixty-dome-mosque.jpg",
    "title": "Historic Sixty Dome Mosque",
    "description": "Step into ancient Bengal and admire the Islamic architectural wonder of Bagerhat."
  }
]


const HeroBanner = () => {
   const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    fade: true
};

    return (
        <section className="relative w-full h-[80vh] overflow-hidden text-white">
            <Slider {...settings}>
                {slider.map((item, idx) => (
                    <div key={idx} className="relative w-full h-[90vh]">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover brightness-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                            <p className="text-lg md:text-xl mb-6 max-w-xl">{item.description}</p>
                            <Link to="/packages">
                                <button className="bg-teal-600 hover:bg-teal-700 cursor-pointer transition duration-150 px-6 py-3 rounded font-semibold shadow">
                                    Explore All Packages
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default HeroBanner;
