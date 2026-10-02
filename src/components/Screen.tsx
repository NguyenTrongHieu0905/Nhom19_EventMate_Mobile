import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "../theme/ui";

export function Screen({ children, scroll = false }: { children: ReactNode; scroll?: boolean }) {
  const content = <View style={{ flex: scroll ? undefined : 1, width: "100%", maxWidth: 760, alignSelf: "center", paddingHorizontal: 20, paddingTop: 22, paddingBottom: 24 }}>{children}</View>;
  return <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: palette.background }}>{scroll ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : content}</SafeAreaView>;
}
