export const ShimmerBrowse = () => {
  return (
    <div className="p-6">
      {/* Hero section shimmer */}
      <div className="h-[400px] w-full bg-gray-700 animate-pulse rounded-md mb-6"></div>

      {/* Movie rows shimmer */}
      <div className="space-y-6">
        {[1, 2, 3, 4].map((row) => (
          <div key={row}>
            <div className="h-6 w-40 bg-gray-600 animate-pulse rounded mb-3"></div>
            <div className="flex gap-4 overflow-x-auto">
              {[1, 2, 3, 4, 5].map((card) => (
                <div
                  key={card}
                  className="h-40 w-28 bg-gray-700 animate-pulse rounded-md"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export const ShimmerMovieCard = () => {
  const count = 6; // Total 6 cards
  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      {/* Top row */}
      <div className="flex justify-center gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg w-72"
          >
            <div className="bg-gray-700 h-60 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-700 rounded w-3/4"></div>
              <div className="h-5 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex justify-center gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx + 3} // unique keys
            className="animate-pulse flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg w-72"
          >
            <div className="bg-gray-700 h-60 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-700 rounded w-3/4"></div>
              <div className="h-5 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




