import { FunctionCard } from "./FunctionCard"

function Section4() {
  return (
    <div>
      <h1 className="text-4xl mx-auto font-semibold text-center py-4">Feature of Society</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, index) => (
          <FunctionCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default Section4
