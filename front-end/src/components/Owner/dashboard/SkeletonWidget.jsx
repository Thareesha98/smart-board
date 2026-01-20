const SkeletonWidget = () => (
  <div className="p-6 border rounded-xl border-light bg-card-bg animate-pulse">
    <div className="w-12 h-12 mb-4 bg-gray-200 rounded-lg"></div>
    <div className="w-24 h-4 mb-2 bg-gray-200 rounded"></div>
    <div className="w-32 h-8 bg-gray-300 rounded"></div>
  </div>
);

export default SkeletonWidget;
