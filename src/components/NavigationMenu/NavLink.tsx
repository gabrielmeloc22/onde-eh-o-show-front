import { Link } from '@radix-ui/react-navigation-menu';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { styled } from '../../styles/stitches.config';

const StyledNavLink = styled(Link, {
  position: 'relative',
  br: '$small',
  color: '$slate11',
  zIndex: 1,
  p: '$2',
  transitionProperty: 'color, backgroundColor',
  transition: '0.4s cubic-bezier(.17,.76,.59,.89)',
  '&[data-active]': {
    bgColor: '$primary6',
    color: '$primary11',
    '&:hover': {
      bgColor: '$primary7',
    },
    cursor: 'default',
    pointerEvents: 'none',
  },
  textDecoration: 'none',
  '&:hover': {
    bgColor: '$slate7',
  },
});

interface NavlinkProps extends React.ComponentProps<typeof StyledNavLink> {
  href: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavlinkProps>(
  function NavLink({ href, children, css, ...props }, ref) {
    const router = useRouter();
    const isActive = href === router.asPath;

    return (
      <NextLink href={href} passHref>
        <StyledNavLink active={isActive} ref={ref} {...props}>
          {children}
        </StyledNavLink>
      </NextLink>
    );
  }
);
