import { MapPin, Clock, Map as MapIcon, Ticket as TicketIcon, Utensils, Hotel as HotelIcon, Train, ShoppingBag, Info } from 'lucide-react';
import Badge from '../ui/Badge';
import StatusSelect from '../ui/StatusSelect';
import { ItineraryItem } from '@/types';

const statusOptions = [
  { value: 'not_started', label: '未開始' },
  { value: 'in_progress', label: '進行中' },
  { value: 'done', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
  { value: 'reserved', label: '已預約' },
  { value: 'need_check', label: '需要確認' },
];

export default function ItineraryCard({ item, onStatusChange }: { item: ItineraryItem, onStatusChange: (status: string) => void }) {
  const getIcon = () => {
    switch (item.type) {
      case 'transport': return <Train size={18} className="text-blue-500" />;
      case 'food': return <Utensils size={18} className="text-orange-500" />;
      case 'hotel': return <HotelIcon size={18} className="text-indigo-500" />;
      case 'attraction': return <MapIcon size={18} className="text-green-500" />;
      case 'shopping': return <ShoppingBag size={18} className="text-pink-500" />;
      case 'ticket': return <TicketIcon size={18} className="text-teal-500" />;
      default: return <Info size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary min-w-[50px]">{item.time}</span>
          {getIcon()}
          <h3 className="font-bold text-gray-800">{item.title}</h3>
        </div>
        <StatusSelect value={item.status || 'not_started'} onChange={onStatusChange} options={statusOptions} />
      </div>

      {(item.location || item.address) && (
        <div className="flex items-start gap-1.5 mt-2 text-gray-600 text-sm">
          <MapPin size={14} className="mt-0.5 shrink-0" />
          <span>{item.location} {item.address && <span className="text-gray-400 text-xs block">{item.address}</span>}</span>
        </div>
      )}

      {item.note && (
        <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-2 rounded">
          {item.note}
        </div>
      )}

      {(item.mapUrl || item.ticketUrl) && (
        <div className="flex gap-2 mt-3">
          {item.mapUrl && (
            <a href={item.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded text-xs font-medium transition-colors">
              開啟 Google Maps
            </a>
          )}
          {item.ticketUrl && (
            <a href={item.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-teal-50 hover:bg-teal-100 text-teal-700 py-1.5 rounded text-xs font-medium transition-colors">
              查看票券 / 預約
            </a>
          )}
        </div>
      )}
    </div>
  );
}
