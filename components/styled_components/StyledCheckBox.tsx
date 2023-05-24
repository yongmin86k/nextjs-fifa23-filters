import styled from 'styled-components'
import COLOR from '../../lib/colors'
import { StyledButton } from './StyledButton'

interface Props {
  checked?: boolean;
}

const Icon = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${COLOR.black};
  transition: all 0.2s ease-in-out;

  ${StyledButton}:hover & {
    fill: ${COLOR.white};
  }
`

const CheckBoxEmpty = () => (
  <Icon xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
    <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Z"/>
  </Icon>
)

const CheckBoxFilled = () => (
  <Icon xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
    <path d="m419 735 289-289-43-43-246 246-119-119-43 43 162 162ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/>
  </Icon>
)

export const StyledCheckBox = ({ checked }: Props = { checked: false }) => (checked ? <CheckBoxFilled /> : <CheckBoxEmpty />)
