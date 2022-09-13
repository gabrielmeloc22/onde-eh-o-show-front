import { useQuery } from "@apollo/client/react";
import { Bell } from "phosphor-react";
import { useState } from "react";
import { GET_UPCOMING_EVENT } from "../../services/Apollo/queries";
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

export type UpcomingEvent = {
  upcomingEvent: {
    name: string;
    date: Date;
    venue: string;
    link: string;
    purchaseDueDate: Date;
    price: number;
  };
};

export function ArtistCard({ id, image, name }: ArtistCardProps) {
  const { data, loading, error } = useQuery<UpcomingEvent>(GET_UPCOMING_EVENT, {
    variables: {
      artistId: id,
    },
  });
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
        <Skeleton isLoaded={!loading}>
          <Text weight="bold" size="large">
            {name}
          </Text>
        </Skeleton>
        {!loading && !data?.upcomingEvent ? (
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
          <Skeleton customSkeleton={EventsInfoSkeleton} isLoaded={!loading}>
            <EventsInfo data={data!} />
          </Skeleton>
        )}
      </Box>
    </Box>
  );
}
