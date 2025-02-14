interface Feature {
  image: string;
  text: string;
  subText: string;
}

export function FunctionCard({ feature }: { feature: Feature }) {
  const { image, text, subText } = feature;

  return (
    <div className="max-w-xs w-full group">
      <div
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col items-start justify-end p-4 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Dark overlay effect (Initially at bottom) */}
        <div className="absolute w-full h-[30%] bottom-0 left-0 bg-black opacity-70 transition-all duration-300 group-hover:h-full group-hover:opacity-60"></div>

        {/* Text container: Initially at the bottom, moves to center on hover */}
        <div className="absolute left-0 right-0 bottom-4 px-4 pb-4 transition-all duration-300 group-hover:bottom-1/2 group-hover:translate-y-1/2 flex flex-col items-start group-hover:items-center">
          <h1 className="text-xl md:text-2xl text-white font-bold text-left group-hover:text-center transition-all duration-300">
            {text}
          </h1>

          {/* SubText (Visible only on Hover) */}
          <p className="text-sm md:text-base text-gray-100 text-left hidden group-hover:block group-hover:text-center transition-opacity duration-300 mt-2 font-bold">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
}
