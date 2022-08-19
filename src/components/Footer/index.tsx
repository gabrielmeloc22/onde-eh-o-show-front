import { Box, Text } from "../Primitives";
import { Link } from "../Primitives/Link";

export function Footer() {
  return (
    <Box
      as="footer"
      css={{
        display: "flex",
        alignItems: "flex-end",
        pb: "$6",
        justifyContent: "center",
        minH: "20vh",
      }}
    >
      <Text>
        Onde é o Show é um projeto criado por{" "}
        <Link href="https://github.com/gabrielmeloc22" target="_blank">
          Gabriel Melo
        </Link>{" "}
        e{" "}
        <Link href="https://github.com/NicolasLopes7" target="_blank">
          Nicolas Lopes
        </Link>
      </Text>
    </Box>
  );
}
