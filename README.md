# RoutineApp

A daily routine planner for phones. The day is split into Morning, Work and
Evening; each block holds a time, a title, a duration and a category, and the
app raises a local notification when one is due.

## How it works

`app/index.tsx` renders the day as three sections and ships with a default
routine, so the app is usable before anything has been added.

`storage/routines.ts` persists routines to `AsyncStorage`, so edits survive a
restart without a backend. Reminders are local notifications through
`expo-notifications` — scheduled on the device, needing no push server and no
network connection.

Routing is `expo-router`, `components/RoutineBlock.tsx` draws a single entry,
and the themed components with the `useColorScheme` hook give light and dark
mode.

## Running it

Requires Node.js and the Expo tooling.

```bash
npm install
npx expo start
```

Then open it in Expo Go, an Android emulator or an iOS simulator from the
options Expo prints.

Notifications fire only on a physical device or a simulator with notification
permission granted; the app requests permission on first launch.

## Building

`eas.json` holds the build profiles:

```bash
eas build --platform android
```

## Stack

React Native · Expo · TypeScript · Expo Router · AsyncStorage ·
expo-notifications · React Native Reanimated
