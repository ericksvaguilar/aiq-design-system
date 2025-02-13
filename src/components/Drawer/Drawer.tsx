import React, { ReactNode, useEffect, useState } from 'react'

import styled, { css, DefaultTheme } from 'styled-components'
import {
  layout,
  shadow,
  margin,
  padding,
  LayoutProps,
  MarginProps,
  ShadowProps,
  PaddingProps
} from 'styled-system'

import { Flex } from '../Flex'
import { Loading } from '../Loading'

export type Props = DefaultTheme &
  LayoutProps &
  ShadowProps &
  MarginProps &
  PaddingProps & {
    opened: boolean
    loading?: boolean
    children?: ReactNode
    onClose?: () => void
    variation?: 'right' | 'left'
  }

const drawerVariations: { [index: string]: any } = {
  right: css<Props>`
    right: 0;

    ${({ opened }) =>
      opened &&
      css`
        transform: translateX(0);
      `}

    ${({ opened }) =>
      !opened &&
      css`
        display: none;
        transform: translateX(100%);
      `}
  `,
  left: css<Props>`
    left: 0;

    ${({ opened }) =>
      opened &&
      css`
        transform: translateX(0);
      `}

    ${({ opened }) =>
      !opened &&
      css`
        display: none;
        transform: translateX(-100%);
      `}
  `
}

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`

export const DrawerStyled = styled.div<Props>`
  max-width: 760px;
  ${layout}
  ${shadow}
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 2000;
  transition: transform 0.8s;
  ${layout}
  ${shadow}
  ${margin}
  ${padding}

  ${({ variation }) => drawerVariations[variation || 'right']}
`

export const Drawer: React.FC<Props> = ({
  loading = false,
  onClose,
  opened = false,
  variation = 'right',
  children,
  ...props
}) => {
  const [bodyOverflow, setBodyOverflow] = useState(false)

  useEffect(() => {
    if (opened) {
      if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden'
        setBodyOverflow(true)
      }
    } else {
      if (bodyOverflow) document.body.style.overflow = 'auto'
    }

    return () => {
      if (bodyOverflow) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [opened, bodyOverflow])

  return (
    <>
      {onClose && opened && (
        <Mask data-testid='drawer-mask' onClick={onClose} />
      )}

      <DrawerStyled
        opened={opened}
        variation={variation}
        data-testid='drawer-content'
        className={opened ? 'drawer-open' : 'drawer-close'}
        {...props}
      >
        <Flex overflow='auto' height='100%' flexDirection='column'>
          {loading ? (
            <Flex
              flex={1}
              height='100%'
              alignItems='center'
              justifyContent='center'
            >
              <Loading />
            </Flex>
          ) : (
            children
          )}
        </Flex>
      </DrawerStyled>
    </>
  )
}
