import { CaretDown, Gear, SignOut, User } from "phosphor-react";
import { signOut, useAuth } from "../../contexts/auth";
import { styled } from "../../styles/stitches.config";
import { Avatar } from "../Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button, Text } from "../Primitives";

const Item = styled(Button, {
  w: "100%",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  gap: "$3",
  py: "$3",
  px: "$5",
  pl: "$3",
  color: "$slate11",
  bgColor: "$slate4",
  fontSize: "$smaller",
  "&:hover": {
    bgColor: "$slate5",
  },
  defaultVariants: {
    color: "",
    size: "",
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
        <Text weight="bold" size="smaller">
          {user?.display_name}
        </Text>
        <CaretDown />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        css={{
          overflow: "hidden",
          w: "fit-content",
          h: "fit-content",
          br: "$small",
          bgColor: "$slate6",
          "button + button": {
            borderTop: "1px solid $slate7",
          },
        }}
        animation={PopoverAnimation}
      >
        <Item>
          <User size="1.25rem" />
          Perfil
        </Item>
        <Item>
          <Gear size="1.25rem" />
          Configurações
        </Item>
        <Item onClick={() => signOut()}>
          <SignOut size="1.25rem" />
          Sair
        </Item>
      </PopoverContent>
    </Popover>
  );
}
