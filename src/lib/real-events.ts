import db from "@/lib/db";
import {
  getRegistrationState,
  listOpenRegistrationDates,
} from "@/lib/event-policy";

export type PublicRealEvent = {
  id: number;
  name: string;
  event_date: string;
  venue: string;
  notes: string | null;
};

export async function getOpenRealEvent(
  now = new Date(),
): Promise<PublicRealEvent | null> {
  const dates = listOpenRegistrationDates(now);
  if (dates.length === 0) return null;

  const placeholders = dates.map(() => "?").join(", ");
  const result = await db.execute({
    sql: `SELECT id, name, event_date, venue, notes
          FROM events
          WHERE event_date IN (${placeholders})
          ORDER BY event_date ASC
          LIMIT 1`,
    args: dates,
  });

  const event = result.rows[0] as unknown as PublicRealEvent | undefined;
  if (!event || getRegistrationState(event.event_date, now) !== "open") {
    return null;
  }

  return event;
}
