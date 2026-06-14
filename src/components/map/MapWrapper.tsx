import dynamic from 'next/dynamic';

const MapWrapper = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        <span className="text-sm font-medium">載入地圖中...</span>
      </div>
    </div>
  )
});

export default MapWrapper;
