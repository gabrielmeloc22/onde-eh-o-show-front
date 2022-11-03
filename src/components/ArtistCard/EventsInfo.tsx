import NextLink from "next/link";
import { ArrowRight, Bell } from "phosphor-react";
import { styled } from "../../styles/stitches.config";
import { Box, Button, Link, Text } from "../Primitives";
import { ScrollingText } from "../ScrollingText";
import { Skeleton } from "../Skeleton";
import { EventsInfoSkeleton } from "./EventsInfoSkeleton";
import { useGetUpcomingEventQuery } from "./hooks/useGetUpcomingEventQuery";

type EventsInfoProps = {
  artistId: string;
};

const DetailText = styled(Text, {
  mb: "$2",
  defaultVariants: {
    size: "smaller",
    color: "neutral-medium",
    weight: "bold",
  },
});

export function EventsInfo({ artistId }: EventsInfoProps) {
  const { data, isFetching } = useGetUpcomingEventQuery(artistId);

  if (!data) {
    return (
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
    );
  }
  const { url, name, venue, date } = data;
  return (
    <Skeleton customSkeleton={EventsInfoSkeleton} isLoaded={!isFetching}>
      <Box
        css={{
          display: "grid",
          justifyContent: "space-between",
          gap: "$4",
        }}
      >
        <Box
          css={{
            overflow: "hidden",
          }}
        >
          <DetailText>Evento mais próximo</DetailText>
          <ScrollingText color="primary" weight="bold" size="larger">
            {name}
          </ScrollingText>
        </Box>
        {/* To implement api feature */}
        {/* <Box>
        <DetailText>Menor preço</DetailText>
        <Text
          as="a"
          css={{
            display: "flex",
            alignItems: "center",
            gap: "$2",
            w: "fit-content",
            color: "$slate12",
            textDecoration: "none",
          }}
          href="#"
        >
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
          <ArrowSquareOut />
        </Text>
      </Box> */}
        <Box>
          <DetailText>Local</DetailText>
          <Text>{venue?.address}</Text>
        </Box>
        <Box>
          <DetailText>Data</DetailText>
          <Text>
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
            }).format(new Date(date))}
          </Text>
        </Box>
        <Box
          css={{
            mt: "$4",
            gridColumn: "1 / span 2",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NextLink href="" passHref>
            <Button
              as="a"
              aria-label="acessar página de ingressos"
              href={"#"}
              css={{
                textDecoration: "none",
              }}
            >
              Ingressos
            </Button>
          </NextLink>
          <NextLink href={url} passHref>
            <Link
              aria-label="Ver mais eventos"
              color="neutral"
              css={{
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "$2",
                "& > svg": {
                  transition: "transform 0.2s ease-in-out",
                },
                "&:hover": {
                  textDecoration: "none",
                  "& > svg": {
                    transform: "translateX(4px)",
                  },
                },
              }}
            >
              <Text
                color="neutral-medium"
                css={{
                  color: "$slate11",
                  display: "none",
                  "@bp2": {
                    display: "block",
                  },
                }}
              >
                Mais eventos
              </Text>
              <ArrowRight size="1.25rem" />
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Skeleton>
  );
}
