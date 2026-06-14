'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTripState } from '@/hooks/useTripState';
import MapWrapper from '@/components/map/MapWrapper';
import { MapPin, ExternalLink, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

function MapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { trip, isClient } = useTripState();
  
  const [activeDate, setActiveDate] = useState<string>(trip[0]?.date || '');
  const [activeItemId, setActiveItemId] = useState<string | undefined>();
  
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Initialize from URL
  useEffect(() => {
    if (!isClient) return;
    const dateParam = searchParams.get('date');
    const itemParam = searchParams.get('item');
    
    if (dateParam && trip.some(d => d.date === dateParam)) {
      setActiveDate(dateParam);
    } else {
      // Use today's date if within trip, else first day
      const today = format(new Date(), 'yyyy-MM-dd');
      if (trip.some(d => d.date === today)) {
        setActiveDate(today);
      }
    }
    
    if (itemParam) {
      setActiveItemId(itemParam);
      // Scroll list to item
      setTimeout(() => {
        const el = document.getElementById(`list-item-${itemParam}`);
        if (el && listContainerRef.current) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [searchParams, trip, isClient]);

  const handleDateChange = (date: string) => {
    setActiveDate(date);
    setActiveItemId(undefined);
    router.push(`/map?date=${date}`);
  };

  const handleItemClick = (id: string) => {
    setActiveItemId(id);
    const el = document.getElementById(`list-item-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  const currentDay = trip.find(d => d.date === activeDate) || trip[0];
  const items = currentDay.items;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 pt-safe pb-16 md:pb-0 overflow-hidden">
      
      {/* Mobile Chips (Top) & Desktop Header */}
      <div className="md:hidden bg-white border-b border-gray-200 z-10">
        <div 
          ref={chipsContainerRef}
          className="flex overflow-x-auto py-3 px-4 gap-2 no-scrollbar"
        >
          {trip.map(day => (
            <button
              key={day.date}
              onClick={() => handleDateChange(day.date)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeDate === day.date 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {format(parseISO(day.date), 'M/d')} {day.city}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop List Container */}
      <div className="hidden md:flex flex-col w-[360px] bg-white border-r border-gray-200 z-10 h-full">
        <div className="p-4 border-b border-gray-200 bg-primary text-white">
          <h1 className="text-xl font-bold mb-3 flex items-center gap-2">
            <MapPin size={24} /> 行程地圖
          </h1>
          <select 
            value={activeDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full bg-white/20 text-white border border-white/30 rounded px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {trip.map(day => (
              <option key={day.date} value={day.date} className="text-gray-800">
                {day.date} {day.city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={listContainerRef}>
          <ItemList items={items} activeItemId={activeItemId} onItemClick={handleItemClick} />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative h-[50vh] md:h-full z-0">
        <MapWrapper 
          items={items} 
          activeItemId={activeItemId} 
          onMarkerClick={handleItemClick} 
        />
      </div>

      {/* Mobile List Container */}
      <div className="md:hidden flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3 relative z-10" ref={listContainerRef}>
        <div className="sticky top-0 bg-gray-50 pb-2 z-20">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            {currentDay.date} {currentDay.city}
          </h2>
        </div>
        <ItemList items={items} activeItemId={activeItemId} onItemClick={handleItemClick} />
      </div>

    </div>
  );
}

function ItemList({ items, activeItemId, onItemClick }: { items: any[], activeItemId?: string, onItemClick: (id: string) => void }) {
  // Sort items to match map order (order property, then original array order)
  const validItems = items.filter(item => item.lat !== undefined && item.lng !== undefined)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  
  const invalidItems = items.filter(item => item.lat === undefined || item.lng === undefined);

  // Re-merge: numbered items first, then unnumbered
  const displayItems = [...validItems, ...invalidItems];

  return (
    <>
      {displayItems.map((item) => {
        const hasCoords = item.lat !== undefined && item.lng !== undefined;
        const index = validItems.findIndex(v => v.id === item.id);
        const number = index >= 0 ? index + 1 : '-';
        const isActive = item.id === activeItemId;

        return (
          <div 
            key={item.id} 
            id={`list-item-${item.id}`}
            onClick={() => hasCoords && onItemClick(item.id)}
            className={`bg-white rounded-xl shadow-sm border p-3 transition-all ${
              isActive ? 'border-primary ring-1 ring-primary' : 'border-gray-100 hover:border-gray-300'
            } ${hasCoords ? 'cursor-pointer' : 'opacity-80'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                hasCoords ? (isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700') : 'bg-gray-50 text-gray-400'
              }`}>
                {number}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                
                {!hasCoords && (
                  <div className="flex items-center gap-1 text-[10px] text-orange-600 bg-orange-50 px-2 py-1 rounded w-fit mb-2">
                    <AlertCircle size={10} /> 尚未設定地圖座標
                  </div>
                )}
                
                {item.note && (
                  <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded mb-2 line-clamp-2">
                    {item.note}
                  </p>
                )}

                {item.mapUrl && (
                  <a 
                    href={item.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1.5 rounded font-medium hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink size={12} /> Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">載入中...</div>}>
      <MapContent />
    </Suspense>
  );
}
