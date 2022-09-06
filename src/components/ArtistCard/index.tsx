import { useQuery } from "@apollo/client/react";
import { BellIcon, PersonIcon } from "@radix-ui/react-icons";
import { GET_UPCOMING_EVENT } from "../../services/Apollo/queries";
import { Image } from "../Image";
import { Box, Button, Text } from "../Primitives";
import { Skeleton } from "../Skeleton";
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

  return (
    <Box
      css={{
        display: "flex",
        flexDir: "column",
        bgColor: "$slate4",
        gap: "$4",
        maxH: "fit-content",
      }}
    >
      {image ? (
        <Image
          css={{
            maxH: "10rem",
          }}
          src={image.url}
          alt={name}
          skeleton
          objectPosition="0 30%"
        />
      ) : (
        <Box
          css={{
            w: "100%",
            minH: "10rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgColor: "$slate6",
          }}
        >
          <PersonIcon width={80} height={80} />
        </Box>
      )}

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
              aria-label="ativar notificações"
            >
              Ativar notificações?
              <BellIcon width={18} height={18} />
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
