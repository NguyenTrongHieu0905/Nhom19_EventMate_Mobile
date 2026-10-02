import { FlatList, Image, Pressable, Text, View } from "react-native";
import { CalendarDays, CheckCircle2 } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { StateView } from "../components/StateView";
import { seedEvents } from "../data/events";
import { EventItem } from "../types/event";
import { useEventContext } from "../context/EventContext";
import { dateLabel, eventImage, Heading, palette, timeLabel, ui } from "../theme/ui";
export function ScheduleScreen({ navigation }: any) {
  const { registrations, checkedInIds } = useEventContext();
  const schedule = registrations.map((registration) => seedEvents.find((event) => event.id === registration.eventId)).filter((event): event is EventItem => Boolean(event)).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  return <Screen><Heading title="Lịch của tôi" subtitle={`${schedule.length} sự kiện đã đăng ký`} action={<CalendarDays size={23} color={palette.blue} />} />
    <FlatList showsVerticalScrollIndicator={false} data={schedule} keyExtractor={(item) => item.id} ListEmptyComponent={<StateView title="Lịch của bạn còn trống" message="Chọn một sự kiện yêu thích để bắt đầu." actionLabel="Khám phá sự kiện" onAction={() => navigation.navigate("Events")} />} renderItem={({ item }) => <Pressable accessibilityRole="button" accessibilityLabel={`Xem ${item.title}`} onPress={() => navigation.navigate("EventDetail", { eventId: item.id })} style={{ backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: palette.line, marginBottom: 14, padding: 14, gap: 12 }}>
      <View style={[ui.row, { alignItems: "flex-start", gap: 14 }]}><Image source={eventImage(item)} style={{ width: 76, height: 82, borderRadius: 6 }} /><View style={{ flex: 1 }}><Text style={{ fontSize: 16, lineHeight: 22, fontWeight: "700", color: palette.ink }}>{item.title}</Text><Text style={[ui.muted, { marginTop: 6 }]}>{dateLabel(item.startsAt)} · {timeLabel(item.startsAt)}</Text><Text style={ui.muted}>{item.location}</Text></View></View>
      <View style={ui.row}><CheckCircle2 size={15} color={checkedInIds.includes(item.id) ? palette.green : palette.blue} /><Text style={{ fontSize: 12, color: checkedInIds.includes(item.id) ? palette.green : palette.blue }}>{checkedInIds.includes(item.id) ? "Đã check-in" : "Đã đăng ký · Chờ check-in"}</Text></View>
    </Pressable>} />
  </Screen>;
}
