function ActionLoader({ action }) {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 flex flex-col items-center space-y-4 max-w-[90vw]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm" />
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>
        <span className="text-lg font-medium text-gray-100">{action}</span>
      </div>
    </div>
  );
}

export default ActionLoader;
