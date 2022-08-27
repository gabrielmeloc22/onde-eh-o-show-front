import { ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { signOut, useAuth } from "../../contexts/auth";
import { styled } from "../../styles/stitches.config";
import { Avatar } from "../Avatar";
import { Popover, PopoverArrow } from "../Popover";
import { Box, Text } from "../Primitives";

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
  zIndex: 0,
});

export function Profile() {
  const { user } = useAuth();

  return (
    <Box
      css={{
        display: "flex",
        alignItems: "center",
        gap: "$4",
      }}
    >
      <Box
        css={{
          textAlign: "right",
        }}
      >
        <Text
          css={{
            fontWeight: "bold",
          }}
        >
          {user?.display_name}
        </Text>
        <Text
          css={{
            fontSize: "small",
            lineHeight: "1.75",
            color: "$slate11",
          }}
        >
          {user?.email}
        </Text>
      </Box>
      <Popover
        align="end"
        portal
        trigger={
          <Avatar
            aria-label={`Menu do perfil de ${user?.display_name}`}
            name={user?.display_name ?? ""}
            src={user?.display_name}
          />
        }
      >
        <Box
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
        >
          <PopoverArrow
            css={{
              fill: "$slate6",
            }}
          />
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
        </Box>
      </Popover>
    </Box>
  );
}
