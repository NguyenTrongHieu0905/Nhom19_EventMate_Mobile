import "react-native-gesture-handler";
import { DefaultTheme, LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CalendarDays, Compass, Home, QrCode, UserRound } from "@tamagui/lucide-icons";
import { TamaguiProvider, Theme } from "tamagui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { palette } from "./src/theme/ui";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import config from "./tamagui.config";
import { EventProvider } from "./src/context/EventContext";
import { HomeScreen } from "./src/screens/HomeScreen";
import { EventListScreen } from "./src/screens/EventListScreen";
import { EventDetailScreen } from "./src/screens/EventDetailScreen";
import { CheckInScreen } from "./src/screens/CheckInScreen";
import { ScheduleScreen } from "./src/screens/ScheduleScreen";
import { AiSummaryScreen } from "./src/screens/AiSummaryScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { RootStackParamList, TabParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/"), "eventmate19://"],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Events: "events",
          Schedule: "schedule",
          CheckIn: "check-in",
          Profile: "profile"
        }
      },
      EventDetail: "event/:eventId",
      AiSummary: "event/:eventId/summary"
    }
  }
};

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.blue,
        tabBarInactiveTintColor: "#8A909B",
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
        tabBarStyle: { height: 66, paddingBottom: 10, paddingTop: 9, backgroundColor: "#FFFFFF", borderTopColor: palette.line, elevation: 0 }
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ", tabBarIcon: ({ color }) => <Home color={color} size={21} /> }}
      />
      <Tabs.Screen
        name="Events"
        component={EventListScreen}
        options={{ title: "Khám phá", tabBarIcon: ({ color }) => <Compass color={color} size={21} /> }}
      />
      <Tabs.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{ title: "Check-in", tabBarIcon: ({ color }) => <QrCode color={color} size={23} /> }}
      />
      <Tabs.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: "Lịch của tôi", tabBarIcon: ({ color }) => <CalendarDays color={color} size={21} /> }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Hồ sơ", tabBarIcon: ({ color }) => <UserRound color={color} size={21} /> }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme="student_light">
        <Theme name="student_light">
        <EventProvider>
          <NavigationContainer linking={linking} theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: palette.background, card: palette.surface, text: palette.ink, primary: palette.blue, border: palette.line } }}>
            <StatusBar style="dark" />
            <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: palette.background }, headerTintColor: palette.ink, headerTitleStyle: { fontSize: 16 } }}>
              <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
              <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Chi tiết sự kiện" }} />
              <Stack.Screen name="AiSummary" component={AiSummaryScreen} options={{ title: "Trợ lý AI" }} />
            </Stack.Navigator>
          </NavigationContainer>
        </EventProvider>
        </Theme>
      </TamaguiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
