import { styled } from "@stitches/react";


export const Link = styled('a', {
  color: '$primary9',
  '&:hover': {
    color: '$primary8',
    textDecoration: 'underline',
  }
})