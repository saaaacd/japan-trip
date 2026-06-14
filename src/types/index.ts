export type TripDay = {
  date: string;
  city: string;
  title: string;
  weatherNote?: string;
  items: ItineraryItem[];
};

export type ItineraryItem = {
  id: string;
  time: string;
  title: string;
  type: "transport" | "food" | "hotel" | "attraction" | "shopping" | "ticket" | "note";
  location?: string;
  address?: string;
  status?: "not_started" | "in_progress" | "done" | "cancelled" | "reserved" | "need_check";
  note?: string;
  mapUrl?: string;
  ticketUrl?: string;
};

export type Hotel = {
  id: string;
  name: string;
  englishName?: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  bookingStatus: "reserved" | "need_check" | "not_booked" | "cancelled";
  bookingPlatform?: string;
  address?: string;
  nearestStation?: string;
  otherStation?: string;
  roomType?: string;
  checkInTime?: string;
  checkOutTime?: string;
  mapUrl?: string;
  bookingUrl?: string;
  rating?: string;
  reviewCount?: number;
  note?: string;
  nearbyAttractions?: string[];
};

export type Ticket = {
  id: string;
  title: string;
  date?: string;
  city?: string;
  status: "not_started" | "reserved" | "purchased" | "need_check" | "sold_out" | "cancelled";
  platform?: string;
  url?: string;
  note?: string;
};

export type Transport = {
  id: string;
  title: string;
  date: string;
  status: "need_check" | "checked" | "purchased" | "done";
  note?: string;
};
