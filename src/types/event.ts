export type EventCategory = "academic" | "career" | "club" | "volunteer";

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  registered: number;
  description: string;
  agenda: string[];
  speakers: string[];
  tags: string[];
  qrCode: string;
};

export type Registration = {
  eventId: string;
  studentId: string;
  createdAt: string;
  reminderEnabled: boolean;
};

export type CheckInResult = {
  eventId: string;
  status: "accepted" | "duplicate" | "invalid";
  message: string;
};
