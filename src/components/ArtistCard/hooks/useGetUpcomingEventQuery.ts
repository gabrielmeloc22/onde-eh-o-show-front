import { useGetUpcomingEventQuery as getUpcomingEvent } from "../../../../generated/graphql";

export type GetUpcomingEventData = ReturnType<typeof useGetUpcomingEventQuery>["data"];

export function useGetUpcomingEventQuery(spotifyId: string) {
  return getUpcomingEvent(
    {
      where: {
        spotifyId: {
          equals: spotifyId,
        },
      },
    },
    {
      select: (data) => {
        const events = data.artist?.events;
        if (events && events.length > 0) return events[0];
        return null;
      },
    }
  );
}
