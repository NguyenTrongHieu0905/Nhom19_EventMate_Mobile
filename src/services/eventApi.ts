import { seedEvents } from "../data/events";
import { CheckInResult, EventCategory, EventItem } from "../types/event";

const PAGE_SIZE = 3;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail() {
  if (Math.random() < 0.08) {
    throw new Error("Mang khong on dinh. Vui long thu lai.");
  }
}

export async function fetchEvents(page: number, category?: EventCategory | "all", query = "") {
  await delay(650);
  maybeFail();
  const normalize = (value: string) => value.toLocaleLowerCase("vi").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  const filtered = seedEvents.filter((item) => (!category || category === "all" || item.category === category) && normalize(`${item.title} ${item.location}`).includes(normalize(query.trim())));
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);
  return {
    items,
    nextPage: start + PAGE_SIZE < filtered.length ? page + 1 : null
  };
}

export async function fetchEventById(eventId: string): Promise<EventItem> {
  await delay(360);
  const event = seedEvents.find((item) => item.id === eventId);
  if (!event) {
    throw new Error("Khong tim thay su kien.");
  }
  return event;
}

export async function submitCheckIn(rawCode: string): Promise<CheckInResult> {
  await delay(480);
  const event = seedEvents.find((item) => item.qrCode === rawCode.trim());
  if (!event) {
    return { eventId: "", status: "invalid", message: "Ma QR khong thuoc su kien hop le." };
  }
  return { eventId: event.id, status: "accepted", message: `Da check-in thanh cong: ${event.title}` };
}
