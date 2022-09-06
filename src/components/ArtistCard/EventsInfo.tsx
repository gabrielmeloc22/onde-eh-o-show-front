import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { UpcomingEvent } from ".";
import { styled } from "../../styles/stitches.config";
import { Box, Button, Link, Text } from "../Primitives";
import { ScrollingText } from "../ScrollingText";
interface EventsInfoProps {
  data: UpcomingEvent;
}

const DetailText = styled(Text, {
  mb: "$2",
  defaultVariants: {
    size: "smaller",
    color: "neutral-medium",
    weight: "bold",
  },
});

export function EventsInfo({ data: { upcomingEvent } }: EventsInfoProps) {
  const { name, date, venue, link, price } = upcomingEvent;

  return (
    <Box
      key={name}
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
      <Box>
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
          <ExternalLinkIcon />
        </Text>
      </Box>
      <Box>
        <DetailText>Local</DetailText>
        <Text>{venue}</Text>
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
            href={link}
            css={{
              textDecoration: "none",
            }}
          >
            Ingressos
          </Button>
        </NextLink>
        <NextLink href="" passHref>
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
            <ArrowRightIcon width={20} height={20} />
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
}
