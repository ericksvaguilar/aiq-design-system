import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { MdExpandMore, MdExpandLess } from 'react-icons/md'

import { Text } from '../Text'
import { Flex } from '../Flex'
import { Link } from '../Link'
import { Icon } from '../Icon'
import { Badge } from '../Badge'

import { SubItens } from './SubItens'

interface ItemProps {
  item: any
  openItem: boolean
  sidebarOpened: boolean
  toggleItem: () => void
  heightScrolledToTop?: number
}

interface ItemStyledProps {
  sidebarOpened?: boolean
  active?: boolean
  isOpen?: boolean
}

const ItemStyled = styled.li<ItemStyledProps>`
  transition: 0.3ms;

  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        &:hover div {
          display: flex !important;
        }
      `
    }
  }}

  ${({ theme, active }) =>
    active &&
    css`
      svg {
        color: ${theme.colors.primary};
      }
    `}

  &:hover {
    cursor: pointer;

    ${({ theme, sidebarOpened }) =>
      !sidebarOpened &&
      css`
        svg {
          color: ${theme.colors.primary};
        }
      `};

    background: ${({ theme, sidebarOpened }) =>
      sidebarOpened ? theme.colors.lightGrey : theme.colors.white};
  }
`

const LinkStyled = styled(Link)`
  padding: 16px 22px;
  display: flex;
  flex-direction: row;
`

export const Item: React.FC<ItemProps> = ({
  item,
  openItem,
  toggleItem,
  sidebarOpened = false,
  heightScrolledToTop
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  function computeBadgeAllItens(item) {
    let value = 0

    if (item.itens) {
      item.itens.forEach(subItem => {
        if (subItem.badge) value += subItem.badge
      })
    }

    if (item.badge) {
      value += item.badge
    }

    return value
  }

  const badgeAllItens = useMemo(() => computeBadgeAllItens(item), [item])

  const changeVisibilitySubItem = () => {
    if (sidebarOpened) {
      setIsOpen(value => !value)
      toggleItem()
    }
  }

  function isItemActive() {
    let active = false
    if (item.href) {
      active = location.pathname.includes(item.href)
      if (item.exact) active = location.pathname === item.href
    }
    item.itens &&
      item.itens.forEach(subItem => {
        if (!active) {
          active = location.pathname.includes(subItem.href)
          if (item.exact) active = location.pathname === subItem.href
        }
      })
    return active
  }

  const ItemWrapper = ({ children }) => {
    if (item.itens && item.itens.length > 0) {
      return (
        <Flex
          flexDirection='row'
          width='100%'
          alignItems='center'
          justifyContent='space-between'
          padding='16px 22px'
          onClick={changeVisibilitySubItem}
        >
          {children}
        </Flex>
      )
    }
    if (item.callback) {
      return (
        <Flex
          flexDirection='row'
          width='100%'
          alignItems='center'
          justifyContent='space-between'
          padding='16px 22px'
          onClick={item.callback}
        >
          {children}
        </Flex>
      )
    }
    return (
      <LinkStyled variant={item.type ? item.type : 'internal'} href={item.href}>
        {children}
      </LinkStyled>
    )
  }

  ItemWrapper.propTypes = {
    children: PropTypes.any
  }

  return (
    <ItemStyled
      isOpen={isOpen}
      active={isItemActive()}
      sidebarOpened={sidebarOpened}
      onMouseEnter={() => !sidebarOpened && setIsOpen(true)}
      onMouseLeave={() => !sidebarOpened && setIsOpen(false)}
    >
      <ItemWrapper>
        <Icon marginRight='22px' color={sidebarOpened ? 'primary' : 'grey'}>
          {item.icon}
        </Icon>

        {sidebarOpened && (
          <Flex flex={1} justifyContent='space-between'>
            <Flex flex={1}>
              <Text cursor='pointer' color='darkerGrey'>
                {item.name}
              </Text>
            </Flex>

            {badgeAllItens > 0 && !openItem && (
              <Badge
                backgroundColor='error'
                color='white'
                count={badgeAllItens}
              />
            )}

            {item.itens && (
              <Icon color='primary'>
                {openItem ? (
                  <MdExpandLess size={18} />
                ) : (
                  <MdExpandMore size={18} />
                )}
              </Icon>
            )}
          </Flex>
        )}
      </ItemWrapper>

      <SubItens
        item={item}
        heightScrolledToTop={heightScrolledToTop}
        sidebarOpened={sidebarOpened}
        itemOpened={sidebarOpened ? openItem : isOpen}
      />
    </ItemStyled>
  )
}

Item.propTypes = {
  item: PropTypes.any.isRequired,
  openItem: PropTypes.bool.isRequired,
  toggleItem: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  heightScrolledToTop: PropTypes.number
}
