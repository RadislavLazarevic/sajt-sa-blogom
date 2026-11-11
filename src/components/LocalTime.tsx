"use client";

import { useSyncExternalStore } from "react";

const TIME_ZONE = "Europe/Belgrade";

const timeFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
});

const offsetFormatter = new Intl.DateTimeFormat("en-US", {
  timeZoneName: "shortOffset",
  timeZone: TIME_ZONE,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

function getSnapshot() {
  const now = new Date();
  const offset = offsetFormatter.formatToParts(now).find((p) => p.type === "timeZoneName")?.value;
  return `${timeFormatter.format(now)} ${offset ?? ""}`.trim();
}

// Empty on the server so the prerendered shell has no request-time value
function getServerSnapshot() {
  return "";
}

export default function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span suppressHydrationWarning>{time}</span>;
}
