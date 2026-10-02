import { ReactNode, createContext, useCallback, useContext, useMemo, useReducer } from "react";
import * as Notifications from "expo-notifications";
import { Registration } from "../types/event";

type EventState = {
  studentId: string;
  favoriteIds: string[];
  registrations: Registration[];
  checkedInIds: string[];
};

type EventAction =
  | { type: "toggleFavorite"; eventId: string }
  | { type: "register"; eventId: string; reminderEnabled: boolean }
  | { type: "checkIn"; eventId: string };

type EventContextValue = EventState & {
  toggleFavorite: (eventId: string) => void;
  registerEvent: (eventId: string, reminderEnabled: boolean) => Promise<void>;
  markCheckedIn: (eventId: string) => void;
  isRegistered: (eventId: string) => boolean;
};

const initialState: EventState = {
  studentId: "22002985",
  favoriteIds: [],
  registrations: [],
  checkedInIds: []
};

const EventContext = createContext<EventContextValue | null>(null);

function reducer(state: EventState, action: EventAction): EventState {
  switch (action.type) {
    case "toggleFavorite":
      return {
        ...state,
        favoriteIds: state.favoriteIds.includes(action.eventId)
          ? state.favoriteIds.filter((id) => id !== action.eventId)
          : [...state.favoriteIds, action.eventId]
      };
    case "register":
      if (state.registrations.some((item) => item.eventId === action.eventId)) {
        return state;
      }
      return {
        ...state,
        registrations: [
          ...state.registrations,
          {
            eventId: action.eventId,
            studentId: state.studentId,
            reminderEnabled: action.reminderEnabled,
            createdAt: new Date().toISOString()
          }
        ]
      };
    case "checkIn":
      if (state.checkedInIds.includes(action.eventId)) {
        return state;
      }
      return { ...state, checkedInIds: [...state.checkedInIds, action.eventId] };
    default:
      return state;
  }
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleFavorite = useCallback((eventId: string) => {
    dispatch({ type: "toggleFavorite", eventId });
  }, []);

  const registerEvent = useCallback(async (eventId: string, reminderEnabled: boolean) => {
    if (reminderEnabled) {
      const permission = await Notifications.requestPermissionsAsync();
      if (permission.status !== "granted") {
        throw new Error("Ban da tu choi quyen thong bao. Su kien van duoc dang ky nhung khong dat nhac lich.");
      }
      await Notifications.scheduleNotificationAsync({
        content: { title: "Sap den gio su kien", body: "Hay kiem tra lich EventMate de check-in dung gio." },
        trigger: { seconds: 10 }
      });
    }
    dispatch({ type: "register", eventId, reminderEnabled });
  }, []);

  const markCheckedIn = useCallback((eventId: string) => {
    dispatch({ type: "checkIn", eventId });
  }, []);

  const isRegistered = useCallback(
    (eventId: string) => state.registrations.some((item) => item.eventId === eventId),
    [state.registrations]
  );

  const value = useMemo(
    () => ({ ...state, toggleFavorite, registerEvent, markCheckedIn, isRegistered }),
    [state, toggleFavorite, registerEvent, markCheckedIn, isRegistered]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEventContext() {
  const value = useContext(EventContext);
  if (!value) {
    throw new Error("useEventContext must be used inside EventProvider");
  }
  return value;
}
