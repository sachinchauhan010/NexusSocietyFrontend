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
        {/* Dark overlay effect on hover */}
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover:bg-black group-hover:opacity-60"></div>

        {/* Text container: Shifts to center on hover */}
        <div className="absolute inset-0 flex flex-col items-start justify-end px-4 pb-4 group-hover:justify-center group-hover:items-center transition-all duration-300">
          <h1 className="text-xl md:text-2xl text-white font-bold text-left group-hover:text-center transition-all duration-300">
            {text}
          </h1>

          {/* SubText (Visible only on Hover) */}
          <p className="text-sm md:text-base text-gray-300 text-left opacity-0 group-hover:opacity-100 group-hover:text-center transition-opacity duration-300 mt-2 font-bold">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
}
