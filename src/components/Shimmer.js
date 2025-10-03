const Shimmer = () => {
  return (
    <div className="p-6 bg-black">
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

export default Shimmer;
