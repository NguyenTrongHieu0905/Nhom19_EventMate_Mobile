import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera, CheckCircle2, QrCode } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { submitCheckIn } from "../services/eventApi";
import { useEventContext } from "../context/EventContext";
import { ActionButton, Heading, palette, ui } from "../theme/ui";
export function CheckInScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState("EVENTMATE:ev-mobile-workshop");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const { markCheckedIn } = useEventContext();
  async function handleCode(raw: string) {
    if (scanned) return;
    setScanned(true); setResult(null);
    try { const response = await submitCheckIn(raw); if (response.status === "accepted") markCheckedIn(response.eventId); setResult({ ok: response.status === "accepted", message: response.message }); }
    catch { setResult({ ok: false, message: "Chưa thể check-in. Vui lòng thử lại." }); }
    finally { setScanned(false); }
  }
  return <Screen scroll><Heading title="Check-in sự kiện" subtitle="Sẵn sàng cho trải nghiệm hôm nay." />
    <View style={{ width: "100%", aspectRatio: 1.15, backgroundColor: "#EAF1FF", borderRadius: 8, overflow: "hidden", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
      {permission?.granted ? <CameraView style={{ width: "100%", height: "100%" }} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} onBarcodeScanned={scanned || result ? undefined : ({ data }) => handleCode(data)} /> : <View style={{ alignItems: "center", gap: 14, padding: 25 }}><QrCode size={90} color={palette.blue} /><Text style={[ui.sectionTitle, { textAlign: "center" }]}>Quét mã tại sự kiện</Text><Text style={[ui.muted, { textAlign: "center" }]}>Mã QR được cung cấp bởi ban tổ chức.</Text></View>}
    </View>
    {!permission?.granted ? <ActionButton label="Mở camera" icon={<Camera size={18} color="white" />} onPress={() => { requestPermission().catch(() => setResult({ ok: false, message: "Không thể mở camera. Bạn có thể nhập mã bên dưới." })); }} /> : <ActionButton secondary label="Quét mã mới" onPress={() => setResult(null)} />}
    <View style={ui.divider} /><Text style={[ui.sectionTitle, { marginBottom: 10 }]}>Nhập mã check-in</Text><TextInput accessibilityLabel="Mã check-in" style={ui.input} placeholder="EVENTMATE:mã-sự-kiện" value={code} onChangeText={setCode} autoCapitalize="none" />
    <View style={{ marginTop: 12 }}><ActionButton secondary label={scanned ? "Đang xác nhận..." : "Xác nhận check-in"} onPress={() => handleCode(code)} disabled={scanned || !code.trim()} /></View>
    {result ? <View style={[ui.row, { marginTop: 18, alignItems: "flex-start" }]}><CheckCircle2 size={20} color={result.ok ? palette.green : palette.pink} /><Text accessibilityLiveRegion="polite" style={[ui.body, { flex: 1, color: result.ok ? palette.green : palette.pink }]}>{result.message}</Text></View> : null}
  </Screen>;
}
