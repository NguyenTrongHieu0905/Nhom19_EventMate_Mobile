import { EventItem } from "../types/event";

export type AiSummary = {
  bullets: string[];
  warning?: string;
};

export async function summarizeEventForStudent(event: EventItem, goal: string, consent: boolean): Promise<AiSummary> {
  if (!consent) {
    throw new Error("Can dong y truoc khi gui noi dung su kien den dich vu AI.");
  }
  if (goal.trim().length < 8) {
    throw new Error("Hay nhap muc tieu tham du cu the hon.");
  }
  if (goal.length > 240) {
    throw new Error("Muc tieu qua dai. Gioi han 240 ky tu de tranh gui du lieu khong can thiet.");
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    bullets: [
      `Nen tham du vi su kien lien quan den: ${event.tags.join(", ")}.`,
      `Lich trinh phu hop nhat voi muc tieu "${goal.trim()}": ${event.agenda.slice(0, 2).join(" -> ")}.`,
      `Cau hoi goi y: em can chuan bi gi truoc su kien va co co hoi ket noi nao sau phien chinh?`
    ],
    warning: "Che do demo khong gui MSSV, vi tri, anh hoac du lieu nhay cam. Khi dung cloud API can dua khoa vao bien moi truong."
  };
}
