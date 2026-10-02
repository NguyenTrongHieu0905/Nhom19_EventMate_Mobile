import { Pressable, Text, View } from "react-native";
import { ArrowRight, CalendarDays, QrCode } from "@tamagui/lucide-icons";
import { EventCard } from "../components/EventCard";
import { seedEvents } from "../data/events";
import { Heading, palette, ui } from "../theme/ui";
import { Screen } from "../components/Screen";
import { useEventContext } from "../context/EventContext";

export function HomeScreen({ navigation }: any) {
  const { registrations, checkedInIds, favoriteIds, toggleFavorite } = useEventContext();
  return (
    <Screen scroll>
      <Heading title="EventMate" subtitle="Chào bạn, hôm nay mình đi đâu?" action={<View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E7F5EF", alignItems: "center", justifyContent: "center" }}><Text style={{ color: palette.green, fontWeight: "800" }}>SV</Text></View>} />
      <View style={{ flexDirection: "row", paddingVertical: 18, borderTopWidth: 1, borderBottomWidth: 1, borderColor: palette.line, marginBottom: 24 }}>
        {[{ count: registrations.length, label: "Đã đăng ký", color: palette.blue }, { count: checkedInIds.length, label: "Đã tham gia", color: palette.green }].map((stat, index) => <View key={stat.label} style={{ flex: 1, paddingLeft: index ? 24 : 0, borderLeftWidth: index ? 1 : 0, borderColor: palette.line }}><Text style={{ fontSize: 28, fontWeight: "800", color: stat.color }}>{String(stat.count).padStart(2, "0")}</Text><Text style={ui.muted}>{stat.label}</Text></View>)}
      </View>
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 28 }}>
        {[{ title: "Lịch của tôi", label: "Xem lịch đã đăng ký", route: "Schedule", icon: <CalendarDays size={22} color={palette.blue} /> }, { title: "Check-in", label: "Quét mã tại sự kiện", route: "CheckIn", icon: <QrCode size={22} color={palette.green} /> }].map((item) => <Pressable accessibilityRole="button" key={item.route} onPress={() => navigation.navigate(item.route)} style={{ flex: 1, gap: 10, padding: 16, backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: palette.line }}>{item.icon}<Text style={{ fontSize: 14, fontWeight: "700", color: palette.ink }}>{item.title}</Text><Text style={{ color: palette.muted, fontSize: 11, lineHeight: 17 }}>{item.label}</Text></Pressable>)}
      </View>
      <View style={[ui.row, { justifyContent: "space-between", marginBottom: 16 }]}><Text style={ui.sectionTitle}>Đừng bỏ lỡ</Text><Pressable accessibilityRole="button" accessibilityLabel="Xem tất cả sự kiện" onPress={() => navigation.navigate("Events")} style={ui.row}><Text style={{ fontSize: 12, fontWeight: "600", color: palette.blue }}>Tất cả</Text><ArrowRight size={16} color={palette.blue} /></Pressable></View>
      {seedEvents.slice(0, 2).map((event) => <EventCard key={event.id} event={event} favorite={favoriteIds.includes(event.id)} onFavorite={() => toggleFavorite(event.id)} onPress={() => navigation.navigate("EventDetail", { eventId: event.id })} />)}
    </Screen>
  );
}
