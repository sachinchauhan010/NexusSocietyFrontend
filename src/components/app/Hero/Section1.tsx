// import HomeVideo from '/HomeVideo.mp4'
import './homeStyle.css'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <img
          src="./event.jpg"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Content */}
      <div className="container d-flex justify-content-center align-items-center ml-20">
        <h1 className="animated-text text-center mb-4 text-purple-600">
          Your next adventure awaits...
        </h1>
      </div>
      <div>
        <p className="z-50 bg-black" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio culpa eum explicabo aliquid aspernatur consequuntur! Eligendi sit iure quaerat excepturi aliquid laudantium possimus enim deserunt suscipit fugit, voluptates nostrum?</p>
      </div>
    </section>
  );
}

