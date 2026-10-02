import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Events: undefined;
  CheckIn: undefined;
  Schedule: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  EventDetail: { eventId: string };
  AiSummary: { eventId: string };
};
