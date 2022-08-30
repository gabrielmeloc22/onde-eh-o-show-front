import { EventsByArtist } from ".";
import { Box, Link, Text } from "../Primitives";

interface EventsInfoProps {
  data: EventsByArtist;
}

export function EventsInfo({ data }: EventsInfoProps) {
  return (
    <>
      {data?.eventsByArtist?.map(({ date, link, name, price, purchaseDueDate, venue }) => (
        <Box
          key={name}
          css={{
            display: "flex",
            flexDir: "column",
            gap: "$3",
          }}
        >
          <Text css={{ color: "$primary9" }}>{name}</Text>
          <Text>
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "medium",
            }).format(new Date(date))}
          </Text>
          <Text>{venue}</Text>
          <Text>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </Text>
          <Link as="a" href={link} css={{ w: "fit-content" }}>
            Veja mais
          </Link>
        </Box>
      ))}
    </>
  );
}
