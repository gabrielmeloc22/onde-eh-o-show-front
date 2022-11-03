import { MusicNotesSimple } from "phosphor-react";
import { Image } from "../Image";
import { Box } from "../Primitives";

interface ArtistImageProps {
  image?: string;
  alt: string;
}

export function ArtistImage({ alt, image }: ArtistImageProps) {
  return (
    <>
      {image ? (
        <Image
          css={{
            maxH: "10rem",
          }}
          src={image}
          alt={alt}
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
          <MusicNotesSimple size="5rem" />
        </Box>
      )}
    </>
  );
}
