import { useState } from "react";
import { Box, Text } from "../Primitives";
import { Skeleton } from "../Skeleton";
import { ArtistImage } from "./ArtistImage";
import { CardOptions } from "./CardOptions";
import { EventsInfo } from "./EventsInfo";
import { EventsInfoSkeleton } from "./EventsInfoSkeleton";
import { useGetArtistQuery } from "./hooks/useGetArtistQuery";
import { useGetUpcomingEventQuery } from "./hooks/useGetUpcomingEventQuery";

interface ArtistCardProps {
  id: string;
}

export function ArtistCard({ id }: ArtistCardProps) {
  const { data: upcomingEvent, isFetching: isFetchingEvent } = useGetUpcomingEventQuery(id);
  const { data: artist, isFetching: isFetchingArtist } = useGetArtistQuery(id);

  const [hover, setHover] = useState(false);

  return (
    <Box
      css={{
        position: "relative",
        display: "flex",
        flexDir: "column",
        bgColor: "$slate4",
        gap: "$4",
        maxH: "fit-content",
        zIndex: 0,
      }}
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <CardOptions hover={hover} />
      <ArtistImage alt={artist?.name ?? ""} image={artist?.image} />
      <Box
        css={{
          h: "100%",
          display: "flex",
          flexDir: "column",
          gap: "$4",
          justifyContent: "space-between",
          p: "$4",
        }}
      >
        <Skeleton isLoaded={!isFetchingArtist}>
          <Text weight="bold" size="large">
            {artist?.name}
          </Text>
        </Skeleton>

        <Skeleton customSkeleton={EventsInfoSkeleton} isLoaded={!isFetchingEvent}>
          <EventsInfo data={upcomingEvent} />
        </Skeleton>
      </Box>
    </Box>
  );
}
