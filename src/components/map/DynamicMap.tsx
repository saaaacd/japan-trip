'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ItineraryItem } from '@/types';
import { ExternalLink } from 'lucide-react';

// Fix for default Leaflet icon issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create numbered icon
const createNumberedIcon = (number: number, isActive: boolean) => {
  const bgClass = isActive ? 'bg-primary scale-110 shadow-lg' : 'bg-gray-800 shadow';
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="${bgClass} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white transition-transform">${number}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

function ChangeView({ bounds, activeItem }: { bounds: L.LatLngBounds | null, activeItem?: ItineraryItem }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeItem && activeItem.lat && activeItem.lng) {
      map.setView([activeItem.lat, activeItem.lng], 15, { animate: true });
    } else if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [map, bounds, activeItem]);
  
  return null;
}

interface DynamicMapProps {
  items: ItineraryItem[];
  activeItemId?: string;
  onMarkerClick?: (id: string) => void;
}

export default function DynamicMap({ items, activeItemId, onMarkerClick }: DynamicMapProps) {
  const validItems = items
    .filter(item => item.lat !== undefined && item.lng !== undefined)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const bounds = useRef<L.LatLngBounds | null>(null);
  const activeItem = validItems.find(item => item.id === activeItemId);

  useEffect(() => {
    if (validItems.length > 0) {
      const b = L.latLngBounds(validItems.map(item => [item.lat!, item.lng!]));
      bounds.current = b;
    } else {
      bounds.current = null;
    }
  }, [validItems]);

  const polylinePositions = validItems.map(item => [item.lat!, item.lng!] as [number, number]);

  // Default to Tokyo if no items
  const center: [number, number] = validItems.length > 0 
    ? [validItems[0].lat!, validItems[0].lng!] 
    : [35.6895, 139.6917];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {validItems.length > 1 && (
          <Polyline 
            positions={polylinePositions} 
            color="#1e3a8a" 
            weight={3} 
            opacity={0.6} 
            dashArray="5, 10" 
          />
        )}

        {validItems.map((item, index) => {
          const isActive = item.id === activeItemId;
          const number = index + 1;
          
          return (
            <Marker 
              key={item.id} 
              position={[item.lat!, item.lng!]}
              icon={createNumberedIcon(number, isActive)}
              eventHandlers={{
                click: () => onMarkerClick?.(item.id)
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {number}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                  
                  {item.note && (
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mb-3 border border-gray-100">
                      {item.note}
                    </div>
                  )}

                  {item.mapUrl ? (
                    <a 
                      href={item.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 w-full bg-blue-50 text-blue-600 py-2 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink size={12} /> 用 Google Maps 開啟
                    </a>
                  ) : (
                    <div className="text-xs text-center text-gray-400 bg-gray-50 py-2 rounded">
                      尚未填寫 Google Maps 連結
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        <ChangeView bounds={bounds.current} activeItem={activeItem} />
      </MapContainer>
    </div>
  );
}
