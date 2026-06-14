'use client';

import { useTripState } from '@/hooks/useTripState';
import ItineraryCard from '@/components/cards/ItineraryCard';
import { MapPin, CalendarDays } from 'lucide-react';

export default function ItineraryPage() {
  const { trip, updateItineraryStatus, isClient } = useTripState();

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarDays size={24} className="text-primary" />
          總行程
        </h1>
      </div>

      <div className="p-4 space-y-8">
        {trip.map((day, index) => (
          <div key={day.date} className="relative">
            {/* Day Header */}
            <div className="sticky top-[60px] z-20 bg-background/95 backdrop-blur py-2 mb-3 border-b border-gray-200">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-primary tracking-wider uppercase mb-1 block">Day {index + 1}</span>
                  <h2 className="text-lg font-bold text-gray-800">{day.date} · {day.title}</h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {day.city}
                  </span>
                  <a 
                    href={`/map?date=${day.date}`}
                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium hover:bg-blue-100 transition-colors flex items-center gap-1"
                  >
                    查看這天地圖
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {day.items.map(item => (
                <ItineraryCard 
                  key={item.id} 
                  item={item} 
                  onStatusChange={(status) => updateItineraryStatus(item.id, status)} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
