import { createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";

const appConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens.color,
      brandBlue: "#276EF1",
      brandGreen: "#19A974",
      brandOrange: "#FFB020",
      ink: "#172033",
      danger: "#C92A2A"
    },
    space: {
      ...config.tokens.space,
      page: 20,
      card: 14
    },
    radius: {
      ...config.tokens.radius,
      card: 8
    }
  },
  themes: {
    ...config.themes,
    student_light: {
      ...config.themes.light,
      background: "#F7F9FC",
      color: "#172033",
      card: "#FFFFFF",
      borderColor: "#DDE3EE",
      accent: "#276EF1"
    },
    student_dark: {
      ...config.themes.dark,
      background: "#10151F",
      color: "#F4F7FB",
      card: "#182131",
      borderColor: "#29364A",
      accent: "#7FB3FF"
    }
  }
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
