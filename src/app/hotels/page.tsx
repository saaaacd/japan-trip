'use client';

import { useTripState } from '@/hooks/useTripState';
import HotelCard from '@/components/cards/HotelCard';
import { Hotel as HotelIcon } from 'lucide-react';

export default function HotelsPage() {
  const { hotels, isClient } = useTripState();

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  // Ensure hotels are sorted by checkIn date (they already are in JSON, but just in case)
  const sortedHotels = [...hotels].sort((a, b) => a.checkIn.localeCompare(b.checkIn));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <HotelIcon size={24} className="text-indigo-600" />
          住宿資訊
        </h1>
      </div>

      <div className="p-4">
        {sortedHotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
        {sortedHotels.length === 0 && (
          <p className="text-center text-gray-500 mt-10">尚無住宿資料</p>
        )}
      </div>
    </div>
  );
}
