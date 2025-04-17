import './homeStyle.css';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded overflow-hidden">
        <img
          src="./event.jpg"
          className="w-full h-full object-cover brightness-75"
          alt="Background"
        />
      </div>

      <div className='flex flex-col items-center justify-center w-full h-full bg-opacity-50'>  


        {/* Content */}
        <div className="relative z-20 text-center">
          <h1 className="animated-text text-center mb-4 text-purple-600">
            Your next adventure awaits...
          </h1>
        </div>

        {/* Additional Content */}
        <div className="relative z-20 mt-10 px-4 text-white font-semibold">
          <p className="text-4xl animate-bounce my-2">
            Don’t just exist, go live a story the world will remember
          </p>
          <p className="text-3xl animate-bounce">
            Lace up and lock in — because what's coming next will be the ride of
            your lifetime!
          </p>
        </div>
      </div>
    </section>
  );
}