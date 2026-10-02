import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "tamagui";
import { EventCategory, EventItem } from "../types/event";
export const palette = { background: "#F5F6F8", surface: "#FFFFFF", ink: "#20232B", muted: "#737986", line: "#E6E8ED", blue: "#246BFD", green: "#16866A", pink: "#E85676" };
export const categories: Record<EventCategory, { label: string; color: string; tint: string }> = {
  academic: { label: "Học thuật", color: "#246BFD", tint: "#EBF2FF" },
  career: { label: "Nghề nghiệp", color: "#16866A", tint: "#E7F5EF" },
  club: { label: "Câu lạc bộ", color: "#D04470", tint: "#FCECF1" },
  volunteer: { label: "Tình nguyện", color: "#B4780A", tint: "#FFF5DD" }
};
export const eventImage = (event: EventItem) => event.category === "academic" ? require("../../assets/events/workshop.jpg") : event.category === "career" ? require("../../assets/events/conference.jpg") : require("../../assets/events/community.jpg");
export const dateLabel = (value: string) => new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
export const timeLabel = (value: string) => new Date(value).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
export function Heading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <View style={ui.heading}><View style={{ flex: 1 }}><Text style={ui.title}>{title}</Text>{subtitle ? <Text style={ui.subtitle}>{subtitle}</Text> : null}</View>{action}</View>;
}
export function ActionButton({ label, onPress, secondary = false, disabled = false, icon }: { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean; icon?: ReactNode }) {
  return <Button accessibilityLabel={label} disabled={disabled} onPress={onPress} minHeight={48} height="auto" paddingHorizontal={18} paddingVertical={12} borderRadius={8} backgroundColor={secondary ? palette.surface : palette.blue} borderWidth={secondary ? 1 : 0} borderColor={palette.line} opacity={disabled ? 0.45 : 1} pressStyle={{ opacity: 0.8 }} gap={9}>{icon}<Text style={[ui.buttonText, secondary && { color: palette.ink }]}>{label}</Text></Button>;
}
export function CategoryTag({ category }: { category: EventCategory }) {
  const meta = categories[category];
  return <View style={[ui.tag, { backgroundColor: meta.tint }]}><Text style={{ color: meta.color, fontSize: 11, fontWeight: "700" }}>{meta.label}</Text></View>;
}
export const ui = StyleSheet.create({
  heading: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 22 },
  title: { fontSize: 25, lineHeight: 32, fontWeight: "800", color: palette.ink },
  subtitle: { fontSize: 13, lineHeight: 20, color: palette.muted, marginTop: 5 },
  sectionTitle: { fontSize: 18, lineHeight: 25, fontWeight: "700", color: palette.ink },
  body: { fontSize: 14, lineHeight: 23, color: palette.ink },
  muted: { fontSize: 13, lineHeight: 21, color: palette.muted },
  button: { minHeight: 48, paddingHorizontal: 18, paddingVertical: 12, backgroundColor: palette.blue, borderRadius: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 9 },
  buttonText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", flexShrink: 1, textAlign: "center" },
  secondaryButton: { backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.line },
  tag: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 4, alignSelf: "flex-start" },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: palette.line, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, color: palette.ink, fontSize: 14, minHeight: 48 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  divider: { height: 1, backgroundColor: palette.line, marginVertical: 20 }
});
