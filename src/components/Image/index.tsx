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

export function Image({
  width = "100%",
  height = "100%",
  objectFit = "cover",
  layout = "fill",
  skeleton = false,
  css,
  ...props
}: PictureProps) {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);

  if (skeleton) {
    return (
      <Skeleton
        isLoaded={imageHasLoaded}
        css={{
          ...css,
          w: width,
          h: height,
          display: "inline-block",
          position: "relative",
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
        width={width}
        height={height}
      >
        <NextImage
          objectFit={objectFit}
          layout={layout}
          {...props}
          onLoadingComplete={() => setImageHasLoaded(true)}
        />
      </Skeleton>
    );
  }
  return (
    <Picture
      css={{
        ...css,
        w: width,
        h: height,
      }}
    >
      <NextImage objectFit={objectFit} layout={layout} {...props} />
    </Picture>
  );
}
