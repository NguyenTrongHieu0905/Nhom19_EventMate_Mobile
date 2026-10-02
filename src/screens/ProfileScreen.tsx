import { useMemo } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Award, Heart, CheckCircle2, CalendarDays } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { useEventContext } from "../context/EventContext";
import { Heading, palette, ui } from "../theme/ui";
export function ProfileScreen() {
  const { studentId, favoriteIds, registrations, checkedInIds } = useEventContext();
  const translateX = useSharedValue(0);
  const progress = useMemo(() => Math.min(100, registrations.length * 25 + checkedInIds.length * 15 + favoriteIds.length * 5), [registrations.length, checkedInIds.length, favoriteIds.length]);
  const gesture = Gesture.Pan().onUpdate((event) => { translateX.value = Math.max(-70, Math.min(event.translationX, 70)); }).onEnd(() => { translateX.value = withSpring(0); });
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));
  return <Screen scroll><Heading title="Hồ sơ của tôi" subtitle="Hành trình trải nghiệm của bạn." />
    <View style={[ui.row, { gap: 16, paddingVertical: 8 }]}><View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#E7F5EF", justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 24, fontWeight: "800", color: palette.green }}>SV</Text></View><View><Text style={ui.sectionTitle}>Sinh viên IUH</Text><Text style={ui.muted}>MSSV {studentId}</Text></View></View>
    <View style={ui.divider} />
    {[{ label: "Sự kiện yêu thích", count: favoriteIds.length, icon: <Heart size={20} color={palette.pink} /> }, { label: "Sự kiện đã đăng ký", count: registrations.length, icon: <CalendarDays size={20} color={palette.blue} /> }, { label: "Sự kiện đã tham gia", count: checkedInIds.length, icon: <CheckCircle2 size={20} color={palette.green} /> }].map((item) => <View key={item.label} style={[ui.row, { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: palette.line }]}>{item.icon}<Text style={[ui.body, { flex: 1, marginLeft: 6 }]}>{item.label}</Text><Text style={{ fontSize: 19, color: palette.ink, fontWeight: "700" }}>{item.count}</Text></View>)}
    <Text style={[ui.sectionTitle, { marginTop: 28 }]}>Dấu ấn của bạn</Text>
    <View style={{ alignItems: "center", paddingVertical: 28 }}><GestureDetector gesture={gesture}><Animated.View style={[{ width: 128, height: 128, borderRadius: 64, backgroundColor: "#FFF4DB", justifyContent: "center", alignItems: "center", gap: 8 }, animatedStyle]}><Award size={40} color="#B4780A" /><Text style={{ fontSize: 24, color: palette.ink, fontWeight: "800" }}>{progress}%</Text></Animated.View></GestureDetector><Text style={[ui.body, { fontWeight: "700", marginTop: 16 }]}>{progress >= 80 ? "Sinh viên năng động" : "Hành trình đang bắt đầu"}</Text><View style={{ width: "100%", height: 6, backgroundColor: palette.line, borderRadius: 3, marginTop: 20 }}><View style={{ width: `${progress}%`, height: 6, backgroundColor: palette.green, borderRadius: 3 }} /></View></View>
    <Text style={[ui.muted, { textAlign: "center" }]}>EventMate · Nhóm 19</Text>
  </Screen>;
}
