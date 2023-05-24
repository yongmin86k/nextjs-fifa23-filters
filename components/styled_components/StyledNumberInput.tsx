import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import COLOR from '../../lib/colors'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  componentSize: 'small' | 'normal' | 'large'
  label?: string
}

const InputWrapper = styled.div.attrs(
  (props: { componentSize: 'small' | 'normal' | 'large' }) => ({
    componentSize: props.componentSize || 'normal',
  }),
)`
  font-size: ${(props) => (
    props.componentSize === 'small'
      ? '12px'
      : props.componentSize === 'normal'
        ? '16px'
        : '24px'
  )};
  transition: all 0.2s ease-in-out;

  & label {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;

    & input {
      height: -webkit-fill-available;
    }
  }
`

const Input = styled.input.attrs(
  (props: { componentSize: 'small' | 'normal' | 'large' }) => ({
    componentSize: props.componentSize || 'normal',
  }),
)`
  min-width: 36px;
  border: 1px solid ${COLOR.border};
  border-radius: 4px;
  padding: 8px 16px;
  text-align: center;
  font-size: ${(props) => (
    props.componentSize === 'small'
      ? '12px'
      : props.componentSize === 'normal'
        ? '16px'
        : '24px'
  )};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${COLOR.black};
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }
`

export const StyledNumberInput = (props: Props) => (
  props.label
    ? (
      <InputWrapper
        style={props.style}
        componentSize={props.componentSize}
      >
        <label>
          {props.label}
          <Input {...props} style={{ marginLeft: 4 }} type='number'/>
        </label>
      </InputWrapper>
    )
    : <Input {...props} type='number'/>
)
