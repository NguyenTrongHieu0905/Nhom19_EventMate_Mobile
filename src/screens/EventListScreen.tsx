import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Search } from "@tamagui/lucide-icons";
import { Screen } from "../components/Screen";
import { ActionButton, categories, Heading, palette, ui } from "../theme/ui";
import { EventCard } from "../components/EventCard";
import { StateView } from "../components/StateView";
import { fetchEvents } from "../services/eventApi";
import { EventCategory, EventItem } from "../types/event";
import { useEventContext } from "../context/EventContext";

const filters: Array<EventCategory | "all"> = ["all", "academic", "career", "club", "volunteer"];

export function EventListScreen({ navigation }: any) {
  const [items, setItems] = useState<EventItem[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [filter, setFilter] = useState<EventCategory | "all">("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const requestVersion = useRef(0);
  const { favoriteIds, toggleFavorite } = useEventContext();

  const load = useCallback(
    async (pageToLoad: number, reset = false) => {
      const version = ++requestVersion.current;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchEvents(pageToLoad, filter, query);
        if (version !== requestVersion.current) return;
        setItems((current) => (reset ? response.items : [...current, ...response.items]));
        setPage(pageToLoad);
        setNextPage(response.nextPage);
      } catch (err) {
        if (version !== requestVersion.current) return;
        setError(err instanceof Error ? err.message : "Co loi khong xac dinh.");
      } finally {
        if (version === requestVersion.current) setLoading(false);
      }
    },
    [filter, query]
  );

  useEffect(() => {
    setItems([]);
    load(1, true);
    return () => { requestVersion.current += 1; };
  }, [load]);

  return (
    <Screen>
      <Heading title="Khám phá sự kiện" subtitle="Một trải nghiệm mới đang chờ bạn." />
      <View style={[ui.row, { backgroundColor: "#FFFFFF", borderRadius: 8, borderWidth: 1, borderColor: palette.line, paddingHorizontal: 14, height: 46, marginBottom: 16 }]}><Search size={18} color={palette.muted} /><TextInput accessibilityLabel="Tìm sự kiện" placeholder="Tìm sự kiện, địa điểm..." placeholderTextColor={palette.muted} value={query} onChangeText={setQuery} style={{ flex: 1, fontSize: 14, color: palette.ink, height: 44 }} /></View>
      <View style={{ height: 44, marginBottom: 18 }}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18 }}>{filters.map((item) => <Pressable accessibilityRole="tab" accessibilityState={{ selected: filter === item }} key={item} onPress={() => setFilter(item)} style={{ justifyContent: "center", borderBottomWidth: 2, borderBottomColor: filter === item ? palette.blue : "transparent", paddingBottom: 8 }}><Text style={{ fontSize: 13, fontWeight: filter === item ? "700" : "500", color: filter === item ? palette.blue : palette.muted }}>{item === "all" ? "Tất cả" : categories[item].label}</Text></Pressable>)}</ScrollView></View>
      <View style={[ui.row, { justifyContent: "space-between", marginBottom: 14 }]}><Text style={ui.sectionTitle}>Sắp diễn ra</Text><Text style={{ color: palette.green, fontSize: 11, fontWeight: "600" }}>Mở đăng ký</Text></View>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            favorite={favoriteIds.includes(item.id)}
            onPress={() => navigation.navigate("EventDetail", { eventId: item.id })}
            onFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={<StateView loading={loading} title={loading ? "Đang tải sự kiện" : error ? "Chưa tải được sự kiện" : "Không tìm thấy sự kiện"} message={error ?? (loading ? undefined : "Thử từ khóa hoặc chủ đề khác.")} actionLabel={error ? "Thử lại" : undefined} onAction={() => load(1, true)} />}
        ListFooterComponent={
          <View style={{ paddingVertical: 10, gap: 12 }}>
            {error && items.length > 0 ? <Text style={{ color: palette.pink }}>{error}</Text> : null}
            {nextPage ? (
              <ActionButton secondary disabled={loading} onPress={() => load(nextPage)} label={loading ? "Đang tải..." : `Xem thêm sự kiện · Trang ${page + 1}`} />
            ) : (
              <Text style={[ui.muted, { textAlign: "center" }]}>Bạn đã xem tất cả sự kiện</Text>
            )}
          </View>
        }
      />
    </Screen>
  );
}
