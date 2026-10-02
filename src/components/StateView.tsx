import { ActivityIndicator, Text, View } from "react-native";
import { CalendarDays } from "@tamagui/lucide-icons";
import { ActionButton, palette, ui } from "../theme/ui";

type Props = {
  title: string;
  message?: string;
  loading?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export function StateView({ title, message, loading, actionLabel, onAction }: Props) {
  return (
    <View style={{ minHeight: 260, justifyContent: "center", alignItems: "center", padding: 28, gap: 14, backgroundColor: palette.background }}>
      {loading ? <ActivityIndicator size="large" color={palette.blue} /> : <CalendarDays size={34} color={palette.blue} />}
      <Text style={[ui.sectionTitle, { textAlign: "center" }]}>
        {title}
      </Text>
      {message ? <Text style={[ui.muted, { textAlign: "center" }]}>{message}</Text> : null}
      {actionLabel && onAction ? <ActionButton label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}
