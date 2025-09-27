const Shimmer = () => {
  return (
    <div className="relative w-full h-[500px] bg-gray-800 overflow-hidden rounded-lg">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>

      {/* Text placeholders */}
      <div className="absolute bottom-8 left-8 space-y-4">
        <div className="h-10 w-72 bg-gray-700 rounded"></div>
        <div className="h-4 w-96 bg-gray-700 rounded"></div>
        <div className="h-4 w-80 bg-gray-700 rounded"></div>
        <div className="h-8 w-32 bg-gray-700 rounded mt-4"></div>
      </div>
    </div>
  );
};

export default Shimmer;
