import React, { useState, InputHTMLAttributes } from 'react'

import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import styled, { css } from 'styled-components'

import {
  color,
  space,
  SpaceProps,
  layout,
  fontSize,
  fontWeight
} from 'styled-system'

import { Button } from '../Button'
import { Text } from '../Text'
import { Box } from '../Box'
import { InputErrorMessage } from '../InputErrorMessage'

export type Props = InputHTMLAttributes<HTMLInputElement> &
  SpaceProps & {
    name?: string
    placeholder?: string
    inputRef?: any
    label?: string
    errorForm?: boolean
    type?: string
    errorMessage?: string
    value?: string
    sufix?: any
    containerProps?: any
    disabled?: boolean

    maxWidth?: number | string
    backgroundColor?: number | string

    nativeAutoComplete?: 'on' | 'disabled'
  }

const Container = styled(Box)`
  ${color}
  ${space}
  ${layout}
  ${fontSize}
  ${fontWeight}
`

const LabelStyled = styled.label<Props>`
  position: relative;
  top: -6px;
  padding-top: 6px;
  line-height: 1.5;
  overflow: hidden;
  display: flex;
  align-items: center;

  & > input {
    max-height: 37px;
    box-sizing: border-box;
    margin: 0;
    font-family: inherit;
    border: solid 1px
      ${({ theme, errorForm }) =>
        errorForm ? theme.colors.error : theme.colors.mediumGrey};
    border-top-color: ${({ label }) => (label ? 'transparent' : 'interiht')};

    border-radius: 4px;
    padding: 9px 13px 9px;
    caret-color: ${({ theme }) => theme.colors.almostBlack};
    color: ${({ theme }) => theme.colors.almostBlack};
    width: 100%;
    height: inherit;
    box-shadow: none;
    line-height: inherit;
    transition: border 0.2s, box-shadow 0.2s;
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.lightGrey : theme.colors.white};

    ${({ placeholder, theme, errorForm }) => {
      if (placeholder === ' ' || placeholder === '') {
        return css`
          &:not(:focus):placeholder-shown {
            border-top-color: ${errorForm
              ? theme.colors.error
              : theme.colors.mediumGrey};
          }

          &:not(:focus):placeholder-shown + span {
            font-size: inherit;
            line-height: 53px !important;
            color: ${theme.colors.grey};
          }
        `
      }

      return css``
    }};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      border-top-color: transparent;
      box-shadow: inset 1px 0 ${({ theme }) => theme.colors.primaryLight},
        inset -1px 0 ${({ theme }) => theme.colors.primaryLight},
        inset 0 -1px ${({ theme }) => theme.colors.primaryLight};
      outline: none;
    }

    &:focus + span {
      color: ${({ theme }) => theme.colors.primary} !important;
    }

    &:focus + span::before,
    &:focus + span::after {
      border-top-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: inset 0 1px ${({ theme }) => theme.colors.primaryLight};
    }

    & + span,
    &:focus + span {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      max-height: 100%;
      font-size: 75%;
      line-height: 15px !important;
      cursor: text;
      transition: color 0.2s, font-size 0.2s, line-height 0.2s;
      color: ${({ theme }) => theme.colors.almostBlack};

      &::before,
      &::after {
        content: '';
        display: block;
        box-sizing: border-box;
        margin-top: 6px;
        border-top: solid 1px;
        min-width: 10px;
        height: 8px;
        pointer-events: none;
        box-shadow: inset 0 1px transparent;
        transition: border-color 0.2s, box-shadow 0.2s;
        border-top-color: ${({ theme, errorForm }) =>
          errorForm ? theme.colors.error : theme.colors.mediumGrey};
      }

      &::before {
        margin-right: 4px;
        border-left: solid 1px transparent;
        border-radius: 4px 0;
      }

      &::after {
        flex-grow: 1;
        margin-left: 4px;
        border-right: solid 1px transparent;
        border-radius: 0 4px;
      }
    }
  }

  & > button,
  & > div.sufix {
    right: 0;
    margin-right: 5px;
    position: absolute;
    background: none;
    border: none;
  }
`

export const InputOutlined: React.FC<Props> = ({
  name,
  inputRef,
  label,
  placeholder = '',
  errorForm,
  type = 'text',
  errorMessage,
  sufix,
  value,
  backgroundColor,
  maxWidth,
  marginRight,
  marginLeft,
  containerProps,
  disabled,
  nativeAutoComplete,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const styledContainer = {
    backgroundColor,
    maxWidth,
    marginRight,
    marginLeft
  }

  if (type === 'password') {
    return (
      <Container
        data-testid='input-outlined-password'
        {...containerProps}
        {...styledContainer}
      >
        <LabelStyled
          type={type}
          label={label}
          errorForm={errorForm}
          disabled={disabled}
          placeholder={placeholder || ' '}
        >
          <input
            {...props}
            placeholder={placeholder || ' '}
            type={showPassword ? 'text' : 'password'}
            ref={inputRef}
            name={name}
            disabled={disabled}
            data-testid='input'
            autoComplete={nativeAutoComplete}
          />
          {label && <Text data-testid='input-label'>{label}</Text>}

          <Button
            palette='primary'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <MdVisibilityOff size={22} />
            ) : (
              <MdVisibility size={22} />
            )}
          </Button>
        </LabelStyled>

        {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
      </Container>
    )
  }

  if (sufix) {
    return (
      <Container
        data-testid='input-outlined-sufix'
        {...containerProps}
        {...styledContainer}
      >
        <LabelStyled
          label={label}
          errorForm={errorForm}
          disabled={disabled}
          placeholder={placeholder || ' '}
        >
          <input
            {...props}
            placeholder={placeholder || ' '}
            type={type}
            value={value}
            ref={inputRef}
            name={name}
            disabled={disabled}
            autoComplete='disabled'
            data-testid='input'
          />
          {label && <Text data-testid='input-label'>{label}</Text>}

          <Box className='sufix'>{sufix}</Box>
        </LabelStyled>

        {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
      </Container>
    )
  }

  return (
    <Container
      {...styledContainer}
      {...containerProps}
      data-testid='input-outlined'
    >
      <LabelStyled
        label={label}
        errorForm={errorForm}
        disabled={disabled}
        placeholder={placeholder || ' '}
      >
        <input
          {...props}
          value={value}
          placeholder={placeholder || ' '}
          name={name}
          type={type}
          ref={inputRef}
          disabled={disabled}
          data-testid='input'
          autoComplete={nativeAutoComplete}
        />
        {label && <Text data-testid='input-label'>{label}</Text>}
      </LabelStyled>

      {errorForm && <InputErrorMessage errorMessage={errorMessage} />}
    </Container>
  )
}
