'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { format, parseISO, isSameDay, isAfter, isBefore, differenceInDays } from 'date-fns';
import { Search, Map, Hotel, Ticket, Train, AlertCircle, Sun } from 'lucide-react';
import { useTripState } from '@/hooks/useTripState';
import ItineraryCard from '@/components/cards/ItineraryCard';
import HotelCard from '@/components/cards/HotelCard';

export default function Dashboard() {
  const { trip, hotels, updateItineraryStatus, isClient } = useTripState();

  const todayInfo = useMemo(() => {
    // For demo/testing, using the actual date. If it's outside trip dates, handle it.
    const now = new Date();
    // To force test during trip: const now = new Date('2026-06-15T12:00:00Z');
    
    const startDate = parseISO(trip[0].date);
    const endDate = parseISO(trip[trip.length - 1].date);
    
    let tripStatus = 'during';
    if (isBefore(now, startDate) && !isSameDay(now, startDate)) tripStatus = 'before';
    if (isAfter(now, endDate) && !isSameDay(now, endDate)) tripStatus = 'after';

    let dayIndex = -1;
    let todayData = null;

    if (tripStatus === 'during') {
      dayIndex = trip.findIndex(d => isSameDay(parseISO(d.date), now));
      if (dayIndex !== -1) {
        todayData = trip[dayIndex];
      } else {
        // Fallback
        todayData = trip[0];
        dayIndex = 0;
      }
    }

    return {
      tripStatus,
      dayNumber: dayIndex + 1,
      todayData,
    };
  }, [trip]);

  const todayHotel = useMemo(() => {
    if (!todayInfo.todayData) return null;
    return hotels.find(h => {
      const checkIn = parseISO(h.checkIn);
      const checkOut = parseISO(h.checkOut);
      const today = parseISO(todayInfo.todayData!.date);
      // If today is >= checkIn and < checkOut
      return (isSameDay(today, checkIn) || isAfter(today, checkIn)) && isBefore(today, checkOut);
    });
  }, [hotels, todayInfo.todayData]);

  if (!isClient) return <div className="p-6 text-center text-gray-500">載入中...</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Profile / Status */}
      <div className="bg-primary text-white p-6 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Map size={150} className="-mt-10 -mr-10" />
        </div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">Japan Trip 2026</h1>
            {todayInfo.tripStatus === 'before' && <p className="text-blue-100">旅程尚未開始</p>}
            {todayInfo.tripStatus === 'after' && <p className="text-blue-100">旅程已結束</p>}
            {todayInfo.tripStatus === 'during' && todayInfo.todayData && (
              <>
                <p className="text-xl font-medium mb-1">Day {todayInfo.dayNumber}</p>
                <p className="text-blue-100 flex items-center gap-1">
                  <Map size={16} /> {todayInfo.todayData.city}
                </p>
              </>
            )}
          </div>
          <Link href="/search" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
            <Search size={20} className="text-white" />
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4 relative z-20">
        
        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-3">
          <QuickLink href="/itinerary" icon={<Map size={24} />} label="全部行程" color="bg-blue-50 text-blue-600" />
          <QuickLink href="/hotels" icon={<Hotel size={24} />} label="住宿資訊" color="bg-indigo-50 text-indigo-600" />
          <QuickLink href="/tickets" icon={<Ticket size={24} />} label="票券連結" color="bg-teal-50 text-teal-600" />
          <QuickLink href="/transport" icon={<Train size={24} />} label="交通資訊" color="bg-orange-50 text-orange-600" />
        </div>

        {todayInfo.tripStatus === 'during' && todayInfo.todayData ? (
          <>
            {/* Weather Note */}
            {todayInfo.todayData.weatherNote && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-3 text-yellow-800 text-sm shadow-sm">
                <Sun size={20} className="shrink-0 text-yellow-600 mt-0.5" />
                <p>{todayInfo.todayData.weatherNote}</p>
              </div>
            )}

            {/* Today's Hotel */}
            {todayHotel && (
              <section>
                <div className="flex justify-between items-end mb-3">
                  <h2 className="text-lg font-bold text-gray-800">今日住宿</h2>
                </div>
                <HotelCard hotel={todayHotel} />
              </section>
            )}

            {/* Today's Itinerary */}
            <section>
              <div className="flex justify-between items-end mb-3">
                <h2 className="text-lg font-bold text-gray-800">今日行程</h2>
                <span className="text-sm text-gray-500">{todayInfo.todayData.date}</span>
              </div>
              
              <div className="space-y-3">
                {todayInfo.todayData.items.map(item => (
                  <ItineraryCard 
                    key={item.id} 
                    item={item} 
                    onStatusChange={(status) => updateItineraryStatus(item.id, status)} 
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center mt-8">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
            <h2 className="text-lg font-bold text-gray-800 mb-2">不在旅程期間</h2>
            <p className="text-gray-500 mb-4">目前日期不在 2026/6/15–2026/6/22 之間。</p>
            <Link href="/itinerary" className="inline-block bg-primary text-white px-6 py-2 rounded-full font-medium shadow-sm hover:bg-blue-800 transition-colors">
              查看全部行程
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </Link>
  );
}
