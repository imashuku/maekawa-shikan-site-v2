export type RegistrationState =
  | "draft"
  | "open"
  | "full"
  | "closed"
  | "completed";

type RegistrationPolicy = {
  status: Exclude<RegistrationState, "completed">;
  opensAt: string;
  closesAt: string;
};

export const REAL_EVENT_POLICIES: Record<string, RegistrationPolicy> = {
  "2026-08-27": {
    status: "open",
    opensAt: "2026-07-30T00:00:00+09:00",
    closesAt: "2026-08-27T18:30:00+09:00",
  },
  "2026-09-30": {
    status: "open",
    opensAt: "2026-07-30T00:00:00+09:00",
    closesAt: "2026-09-30T18:30:00+09:00",
  },
};

export function getRegistrationState(
  eventDate: string,
  now = new Date(),
): RegistrationState {
  const policy = REAL_EVENT_POLICIES[eventDate];
  if (!policy) return "draft";
  if (now < new Date(policy.opensAt)) return "draft";
  if (now > new Date(policy.closesAt)) return "completed";
  return policy.status;
}

export function listOpenRegistrationDates(now = new Date()): string[] {
  return Object.keys(REAL_EVENT_POLICIES)
    .filter((date) => getRegistrationState(date, now) === "open")
    .sort();
}
