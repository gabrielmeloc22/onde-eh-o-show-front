import { ChevronDownIcon, ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { signOut, useAuth } from "../../contexts/auth";
import { styled } from "../../styles/stitches.config";
import { Avatar } from "../Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Text } from "../Primitives";

const Item = styled("div", {
  fontSize: "0.95rem",
  position: "relative",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  gap: "$3",
  pr: "$4",
  pl: "$3",
  py: "$3",
  "&:hover": {
    bgColor: "$slate3",
    cursor: "pointer",
  },
});

const PopoverAnimation = {
  initial: {
    height: 0,
  },
  animate: {
    height: "max-content",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Profile() {
  const { user } = useAuth();

  return (
    <Popover>
      <PopoverTrigger
        css={{
          display: "flex",
          color: "$slate12",
          alignItems: "center",
          gap: "$3",
          bgColor: "$slate4",
          borderRadius: "$round $medium $medium $round",
          pr: "$3",
          pl: "$1",
          py: "$1",
          "&:hover": {
            color: "$slate12",
            bgColor: "$slate4",
          },
          "& > svg": {
            transition: "transform 0.3s cubic-bezier(.48,.29,.21,1.34)",
          },
          '&[data-state="open"]': {
            "& > svg": {
              transform: "rotate(180deg)",
            },
          },
        }}
      >
        <Avatar
          aria-label={`Menu do perfil de ${user?.display_name}`}
          name={user?.display_name ?? ""}
          src={user?.display_name}
          width="2.5rem"
          height="2.5rem"
        />
        <Text
          css={{
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          {user?.display_name}
        </Text>
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        css={{
          overflow: "hidden",
          w: "fit-content",
          h: "fit-content",
          br: "$small",
          bgColor: "$slate6",
          "div + div": {
            borderTop: "1px solid $slate7",
          },
        }}
        animation={PopoverAnimation}
      >
        <Item>
          <PersonIcon width={17} height={17} />
          Perfil
        </Item>
        <Item>
          <GearIcon width={17} height={17} />
          Configurações
        </Item>
        <Item onClick={() => signOut()}>
          <ExitIcon width={17} height={17} />
          Sair
        </Item>
      </PopoverContent>
    </Popover>
  );
}
