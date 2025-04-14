// import HomeVideo from '/HomeVideo.mp4'
import './homeStyle.css'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0 rounded overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <video
          src={HomeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div> */}

      {/* Content */}
      <div className="container d-flex justify-content-center align-items-center vh-100 ml-20">
        <h1 className="animated-text text-center mb-4 text-purple-600">
          Your next adventure awaits...
        </h1>
      </div>
    </section>
  );
}

