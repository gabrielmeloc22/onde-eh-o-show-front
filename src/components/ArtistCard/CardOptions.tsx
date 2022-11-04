import { AnimatePresence, motion } from "framer-motion";
import { Bell, Heart } from "phosphor-react";
import { useBreakpointValue } from "../../styles/hooks/useBreakpointValue";
import { styled } from "../../styles/stitches.config";
import { Button } from "../Primitives";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger as OriginalTooltipTrigger,
} from "../Tooltip";
import { useIsTrackedArtist } from "./hooks/useIsTrackedArtist";
import { useAddTrackedArtistMutation, useRemoveTrackedArtistMutation } from "../../../generated/graphql";
import { useAuth } from "../../contexts/auth";
import { queryClient } from "../../services/ReactQuery";

const Wrapper = styled(motion.div, {
  position: "absolute",
  display: "flex",
  flexDir: "column",
  gap: "$2",
  top: "$3",
  right: "$3",
  zIndex: 1,
});

const TooltipTrigger = styled(OriginalTooltipTrigger, Button, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  br: "$round",
  bgColor: "$slate3",
  "&:hover": {
    bgColor: "$slate4",
  },
  defaultVariants: {
    type: "icon",
    color: "neutral",
  },
});

interface CardOptions extends React.ComponentPropsWithRef<typeof Wrapper> {
  hover: boolean;
  artistId: string;
}

export function CardOptions({ hover, artistId, ...props }: CardOptions) {
  const isFavorite = useIsTrackedArtist(artistId);
  const { mutateAsync: addTrackedArtist, isSuccess: hasAdded } = useAddTrackedArtistMutation();
  const { mutateAsync: removeTrackedArtist, isSuccess: hasRemoved } = useRemoveTrackedArtistMutation();

  const { user } = useAuth();

  async function handleTrackArtistMutation() {
    if (!isFavorite) {
      await addTrackedArtist({
        data: {
          artist: {
            connectOrCreate: {
              where: {
                spotifyId: artistId,
              },
              create: {
                spotifyId: artistId,
              },
            },
          },
          user: {
            connect: {
              spotifyId: user?.id,
            },
          },
        },
      });
    } else {
      await removeTrackedArtist({
        where: {
          userId_artistId: {
            userId: user?.id!,
            artistId,
          },
        },
      });
    }
    queryClient.refetchQueries({
      queryKey: ["GetTrackedArtists"],
    });
  }

  const isMobile = useBreakpointValue({
    base: true,
    bp3: false,
  });

  return (
    <AnimatePresence>
      {(hover || isMobile) && (
        <Wrapper
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
          {...props}
        >
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger onClick={handleTrackArtistMutation}>
                <Heart size="1.25rem" weight={(isFavorite || hasAdded) && !hasRemoved ? "fill" : "regular"} />
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                Adicionar aos favoritos
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Bell size="1.25rem" />
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                Ativar notificações
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
