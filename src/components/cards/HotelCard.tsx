import { MapPin, Calendar, Clock, Star, Map as MapIcon, ExternalLink } from 'lucide-react';
import Badge from '../ui/Badge';
import { Hotel } from '@/types';

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
          {hotel.englishName && <p className="text-xs text-gray-500">{hotel.englishName}</p>}
        </div>
        <Badge status={hotel.bookingStatus} />
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3 mb-3 text-sm">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar size={14} className="text-primary" />
          <span>{hotel.checkIn} ~ {hotel.checkOut}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 text-right justify-end">
          <span className="font-medium">{hotel.nights} 晚</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock size={14} className="text-primary" />
          <span>In: {hotel.checkInTime || '尚未填寫'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 text-right justify-end">
          <span>Out: {hotel.checkOutTime || '尚未填寫'}</span>
        </div>
      </div>

      <div className="space-y-2 mt-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
        <div className="flex items-start gap-1.5">
          <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />
          <div>
            <p>{hotel.address || '尚未填寫'}</p>
            {hotel.nearestStation && <p className="text-xs text-gray-500 mt-1">🚉 {hotel.nearestStation}</p>}
          </div>
        </div>
        
        <div className="bg-gray-50 p-2 rounded mt-2">
          <p className="font-medium text-gray-700 mb-1">房型：{hotel.roomType || '尚未填寫'}</p>
          <p className="text-xs text-gray-500">{hotel.note || '無備註'}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {hotel.mapUrl ? (
          <a href={hotel.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium transition-colors">
            <MapIcon size={14} /> Google Maps
          </a>
        ) : (
          <button disabled className="flex-1 bg-gray-50 text-gray-400 py-2 rounded text-sm cursor-not-allowed">無地圖連結</button>
        )}
        
        {hotel.bookingUrl ? (
          <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded text-sm font-medium transition-colors">
            <ExternalLink size={14} /> 訂房紀錄
          </a>
        ) : (
          <button disabled className="flex-1 bg-gray-50 text-gray-400 py-2 rounded text-sm cursor-not-allowed">無訂房連結</button>
        )}
      </div>
    </div>
  );
}
