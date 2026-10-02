import { useEffect, useState } from "react";
import { Alert, Image, Platform, Switch, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CalendarDays, MapPin, Sparkles } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { StateView } from "../components/StateView";
import { fetchEventById } from "../services/eventApi";
import { EventItem } from "../types/event";
import { RootStackParamList } from "../types/navigation";
import { useEventContext } from "../context/EventContext";
import { ActionButton, CategoryTag, dateLabel, eventImage, palette, timeLabel, ui } from "../theme/ui";
type Props = NativeStackScreenProps<RootStackParamList, "EventDetail">;
export function EventDetailScreen({ route, navigation }: Props) {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const { registerEvent, isRegistered } = useEventContext();
  useEffect(() => { let active = true; setLoading(true); fetchEventById(route.params.eventId).then((value) => { if (active) setEvent(value); }).catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [route.params.eventId]);
  async function register() {
    if (!event || busy) return;
    setBusy(true); setNotice("");
    try { await registerEvent(event.id, reminder); setNotice("Đã thêm sự kiện vào lịch của bạn."); }
    catch (err) { const message = err instanceof Error ? err.message : "Chưa thể đăng ký."; setNotice(message); if (Platform.OS !== "web") Alert.alert("Thông báo", message); }
    finally { setBusy(false); }
  }
  if (loading) return <StateView loading title="Đang tải sự kiện" />;
  if (error || !event) return <StateView title="Chưa mở được sự kiện" message={error ?? "Không có dữ liệu."} />;
  const registered = isRegistered(event.id);
  return <Screen scroll>
    <Image source={eventImage(event)} style={{ width: "100%", aspectRatio: 1.7, borderRadius: 8, marginBottom: 20 }} />
    <CategoryTag category={event.category} />
    <Text style={[ui.title, { marginVertical: 12 }]}>{event.title}</Text>
    <View style={[ui.row, { marginBottom: 10 }]}><CalendarDays size={18} color={palette.blue} /><Text style={ui.body}>{dateLabel(event.startsAt)} · {timeLabel(event.startsAt)} - {timeLabel(event.endsAt)}</Text></View>
    <View style={ui.row}><MapPin size={18} color={palette.green} /><Text style={[ui.body, { flex: 1 }]}>{event.location}</Text></View>
    <View style={ui.divider} />
    <Text style={ui.sectionTitle}>Về sự kiện</Text><Text style={[ui.body, { marginTop: 10 }]}>{event.description}</Text>
    <View style={ui.divider} />
    <Text style={[ui.sectionTitle, { marginBottom: 14 }]}>Lịch trình</Text>
    {event.agenda.map((item, i) => <View key={item} style={[ui.row, { alignItems: "flex-start", marginBottom: 14 }]}><View style={{ width: 27, height: 27, borderRadius: 14, backgroundColor: "#EAF1FF", alignItems: "center", justifyContent: "center" }}><Text style={{ color: palette.blue, fontSize: 12, fontWeight: "700" }}>{i + 1}</Text></View><Text style={[ui.body, { flex: 1 }]}>{item}</Text></View>)}
    <Text style={[ui.sectionTitle, { marginTop: 8, marginBottom: 10 }]}>Diễn giả</Text>{event.speakers.map((speaker) => <Text key={speaker} style={[ui.body, { marginBottom: 6 }]}>{speaker}</Text>)}
    <View style={ui.divider} />
    <View style={[ui.row, { justifyContent: "space-between", marginBottom: 18 }]}><View style={{ flex: 1 }}><Text style={ui.body}>Nhắc lịch tham dự</Text><Text style={ui.muted}>Thông báo trước khi bắt đầu</Text></View><Switch accessibilityLabel="Nhắc lịch tham dự" value={reminder} onValueChange={setReminder} disabled={registered} trackColor={{ true: palette.blue }} /></View>
    <Text style={[ui.muted, { marginBottom: 14 }]}>{event.registered}/{event.capacity} sinh viên đăng ký · Còn {Math.max(0, event.capacity - event.registered)} chỗ</Text>
    <View style={{ gap: 12 }}><ActionButton label={registered ? "Đã đăng ký thành công" : busy ? "Đang đăng ký..." : "Đăng ký tham dự"} onPress={register} disabled={registered || busy} /><ActionButton secondary label="Tóm tắt cùng AI" icon={<Sparkles size={18} color={palette.blue} />} onPress={() => navigation.navigate("AiSummary", { eventId: event.id })} />{notice ? <Text accessibilityLiveRegion="polite" style={[ui.muted, { color: registered ? palette.green : palette.pink }]}>{notice}</Text> : null}</View>
  </Screen>;
}
