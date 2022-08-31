import { ArrowRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { EventsByArtist } from ".";
import { styled } from "../../styles/stitches.config";
import { Box, Button, Link, Text } from "../Primitives";
import { ScrollingText } from "../ScrollingText";
interface EventsInfoProps {
  data: EventsByArtist;
}

const DetailText = styled(Text, {
  fontSize: "smaller",
  color: "$slate9",
  fontWeight: "bold",
  mb: "$2",
});

export function EventsInfo({ data: { eventsByArtist } }: EventsInfoProps) {
  const { date, link, name, price, purchaseDueDate, venue } = eventsByArtist[0];

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
        <ScrollingText
          css={{
            color: "$primary9",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
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
              css={{
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
