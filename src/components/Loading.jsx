export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-coffee-50 to-orange-50">
      <div className="text-center">
        {/* Spinner animasi */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-coffee-200 border-t-coffee-600 border-r-coffee-400 rounded-full animate-spin mx-auto mb-5"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">☕</span>
          </div>
        </div>
        
        {/* Teks loading */}
        <p className="text-coffee-600 font-medium text-base">Loading...</p>
        <p className="text-coffee-400 text-xs mt-1">Papi Coffee CRM</p>
      </div>
    </div>
  );
}