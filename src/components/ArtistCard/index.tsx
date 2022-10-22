import { Bell } from "phosphor-react";
import { useState } from "react";
import { useGetUpcomingEventQuery } from "../../../generated/graphql";
import { Box, Button, Text } from "../Primitives";
import { Skeleton } from "../Skeleton";
import { ArtistImage } from "./ArtistImage";
import { CardOptions } from "./CardOptions";
import { EventsInfo } from "./EventsInfo";
import { EventsInfoSkeleton } from "./EventsInfoSkeleton";

interface ArtistCardProps {
  id: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
}

export function ArtistCard({ id, image, name }: ArtistCardProps) {
  const { data, isFetching, error } = useGetUpcomingEventQuery(
    {
      artistId: id,
    },
    {
      staleTime: 1000 * 60 * 60,
    }
  );

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
      <ArtistImage alt={name} image={image} />
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
        <Skeleton isLoaded={!isFetching}>
          <Text weight="bold" size="large">
            {name}
          </Text>
        </Skeleton>
        {!isFetching && !data?.getArtistUpcomingEvent ? (
          <Text
            as="div"
            css={{
              py: "$5",
              my: "auto",
              textAlign: "center",
            }}
            color="neutral-medium"
            size="smaller"
          >
            Sem eventos próximos.
            <Button
              css={{
                display: "flex",
                alignItems: "center",
                mx: "auto",
                gap: "$2",
                fontWeight: "bold",
              }}
              size="small"
              type="ghost"
            >
              Ativar notificações?
              <Bell size="1.25rem" />
            </Button>
          </Text>
        ) : (
          <Skeleton customSkeleton={EventsInfoSkeleton} isLoaded={!isFetching}>
            <EventsInfo data={data!} />
          </Skeleton>
        )}
      </Box>
    </Box>
  );
}
