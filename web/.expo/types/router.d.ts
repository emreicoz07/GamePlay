/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(game)` | `/(game)/` | `/(game)/game` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/..\components\game\Leaderboard` | `/..\services\api` | `/_sitemap` | `/explore` | `/game`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
