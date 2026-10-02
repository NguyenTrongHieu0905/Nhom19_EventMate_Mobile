import { useEffect, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShieldCheck, Sparkles } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { StateView } from "../components/StateView";
import { fetchEventById } from "../services/eventApi";
import { AiSummary, summarizeEventForStudent } from "../services/aiSummary";
import { EventItem } from "../types/event";
import { RootStackParamList } from "../types/navigation";
import { ActionButton, Heading, palette, ui } from "../theme/ui";
type Props = NativeStackScreenProps<RootStackParamList, "AiSummary">;
export function AiSummaryScreen({ route }: Props) {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [goal, setGoal] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<AiSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { fetchEventById(route.params.eventId).then(setEvent).catch((err) => setError(err.message)); }, [route.params.eventId]);
  async function runAi() { if (!event) return; setLoading(true); setError(null); setSummary(null); try { setSummary(await summarizeEventForStudent(event, goal, consent)); } catch (err) { setError(err instanceof Error ? err.message : "AI chưa phản hồi."); } finally { setLoading(false); } }
  if (!event) return <StateView loading={!error} title={error ? "Chưa tải được sự kiện" : "Đang chuẩn bị trợ lý AI"} message={error ?? undefined} />;
  return <Screen scroll><Heading title="Điều gì dành cho bạn?" subtitle={event.title} action={<Sparkles size={26} color={palette.blue} />} />
    <Text style={[ui.sectionTitle, { marginBottom: 12 }]}>Mục tiêu tham dự</Text><TextInput accessibilityLabel="Mục tiêu tham dự" style={[ui.input, { minHeight: 126, textAlignVertical: "top", lineHeight: 23 }]} multiline maxLength={240} value={goal} onChangeText={setGoal} placeholder="Ví dụ: tìm cơ hội thực tập, học React Native hoặc kết nối với diễn giả..." placeholderTextColor={palette.muted} /><Text style={[ui.muted, { textAlign: "right", marginTop: 6 }]}>{goal.length}/240</Text>
    <View style={ui.divider} /><View style={[ui.row, { alignItems: "flex-start", gap: 12 }]}><ShieldCheck size={23} color={palette.green} /><View style={{ flex: 1 }}><Text style={[ui.body, { fontWeight: "700" }]}>Quyền riêng tư của bạn</Text><Text style={ui.muted}>Chỉ dùng mô tả sự kiện và mục tiêu. Không nhập MSSV, vị trí hoặc dữ liệu nhạy cảm.</Text></View></View>
    <View style={[ui.row, { justifyContent: "space-between", marginVertical: 20 }]}><Text style={[ui.body, { flex: 1, marginRight: 15 }]}>Đồng ý sử dụng thông tin trên</Text><Switch accessibilityLabel="Đồng ý sử dụng thông tin" value={consent} onValueChange={setConsent} trackColor={{ true: palette.blue }} /></View>
    <ActionButton label={loading ? "Đang tạo gợi ý..." : "Tạo gợi ý tham dự"} disabled={loading} onPress={runAi} icon={<Sparkles size={18} color="white" />} />
    {error ? <Text style={[ui.body, { color: palette.pink, marginTop: 14 }]}>{error}</Text> : null}
    {summary ? <View style={{ marginTop: 28 }}><Text style={[ui.sectionTitle, { marginBottom: 16 }]}>Gợi ý dành cho bạn</Text>{summary.bullets.map((item, i) => <View key={item} style={[ui.row, { alignItems: "flex-start", marginBottom: 16 }]}><Text style={{ color: palette.blue, fontWeight: "700" }}>{i + 1}.</Text><Text style={[ui.body, { flex: 1 }]}>{item}</Text></View>)}<Text style={ui.muted}>{summary.warning}</Text></View> : null}
  </Screen>;
}
