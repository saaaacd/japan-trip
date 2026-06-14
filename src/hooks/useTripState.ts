import { useLocalStorage } from './useLocalStorage';
import tripData from '../data/trip.json';
import ticketsData from '../data/tickets.json';
import transportData from '../data/transport.json';
import hotelsData from '../data/hotels.json';
import { TripDay, Ticket, Transport, Hotel } from '../types';

type ItineraryStatuses = Record<string, string>;
type TicketStatuses = Record<string, string>;
type TransportStatuses = Record<string, string>;

export function useTripState() {
  const [itineraryStatuses, setItineraryStatuses, isClient] = useLocalStorage<ItineraryStatuses>('itinerary_statuses', {});
  const [ticketStatuses, setTicketStatuses] = useLocalStorage<TicketStatuses>('ticket_statuses', {});
  const [transportStatuses, setTransportStatuses] = useLocalStorage<TransportStatuses>('transport_statuses', {});

  // Merge JSON data with localStorage statuses
  const trip: TripDay[] = (tripData as TripDay[]).map(day => ({
    ...day,
    items: day.items.map(item => ({
      ...item,
      status: (itineraryStatuses[item.id] as any) || item.status,
    }))
  }));

  const tickets: Ticket[] = (ticketsData as Ticket[]).map(ticket => ({
    ...ticket,
    status: (ticketStatuses[ticket.id] as any) || ticket.status,
  }));

  const transport: Transport[] = (transportData as Transport[]).map(trans => ({
    ...trans,
    status: (transportStatuses[trans.id] as any) || trans.status,
  }));

  const hotels: Hotel[] = hotelsData as Hotel[];

  const updateItineraryStatus = (id: string, status: string) => {
    setItineraryStatuses(prev => ({ ...prev, [id]: status }));
  };

  const updateTicketStatus = (id: string, status: string) => {
    setTicketStatuses(prev => ({ ...prev, [id]: status }));
  };

  const updateTransportStatus = (id: string, status: string) => {
    setTransportStatuses(prev => ({ ...prev, [id]: status }));
  };

  return {
    isClient,
    trip,
    tickets,
    transport,
    hotels,
    updateItineraryStatus,
    updateTicketStatus,
    updateTransportStatus,
  };
}
