import { eventsByArtist } from "./eventsByArtist";
import { getUpcomingEvent } from "./upcomingEvents";

export const handlers = [...eventsByArtist, ...getUpcomingEvent];
