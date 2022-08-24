import NextImage from "next/image";
import { useState } from "react";
import { styled } from "../../styles/stitches.config";
import { Skeleton } from "../Skeleton";

type PictureProps = React.ComponentPropsWithRef<typeof NextImage> &
  Pick<React.ComponentProps<typeof Skeleton>, "css"> & {
    skeleton?: boolean;
  };

const Picture = styled("picture", {
  display: "inline-block",
  "& > span": {
    w: "100% !important",
    h: "100% !important",
  },
});

export function Image({ css, skeleton = false, ...props }: PictureProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);

  if (skeleton) {
    return (
      <Skeleton
        isLoaded={imageHasLoaded}
        css={{
          ...css,
          display: "inline-block",
          "& > span": {
            position: "relative !important",
            w: "100% !important",
            h: "100% !important",
            "& > img": {
              position: "relative !important",
              w: "100% !important",
              h: "100% !important",
            },
          },
        }}
        width="100%"
        height="100%"
      >
        <NextImage
          objectFit="cover"
          layout="fill"
          {...props}
          onLoadingComplete={() => setImageHasLoaded(true)}
        />
      </Skeleton>
    );
  }
  return (
    <Picture css={css}>
      <NextImage objectFit="cover" layout="fill" {...props} />
    </Picture>
  );
}
