import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import COLOR from '../../lib/colors'

const Menu = styled.div`
  background-color: ${COLOR.black};
  color: ${COLOR.white};

  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`

const List = styled.li.attrs(
  (props: { isActive: boolean }) => ({ isActive: props.isActive }),
)`
  ${({ isActive }) => (`
    margin-right: 24px;
    
    a {
      display: block;
      padding: 12px 16px;
      color: ${COLOR.white};
      text-decoration: ${isActive ? 'underline' : 'none'};
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: ${COLOR.white};
        color: ${COLOR.black};
      }
    }
  `)}
`

const MenuList = ({ children, href }: PropsWithChildren<{
  href: string
}>) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return <List isActive={isActive}><Link href={href}>{children}</Link></List>
}

export const StyledMenu = () => (
  <Menu>
    <ul>
      <MenuList href="/">
        All players
      </MenuList>

      <MenuList href="/leagues">
        By leagues
      </MenuList>
    </ul>
  </Menu>
)
