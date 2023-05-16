import styled from 'styled-components'
import COLOR from '../lib/colors'

export const Button = styled.button.attrs(
  (props: { size: 'small' | 'normal' | 'large' }) => ({
    size: props.size || 'normal',
  }),
)`
display: flex;
align-items: center;
padding: 8px 16px;
border-radius: 4px;
border: 1px solid ${COLOR.border};
background-color: ${COLOR.white};
cursor: pointer;
transition: border-color 0.2s ease-in-out;
font-size: ${(props) => (
    props.size === 'small'
      ? '12px'
      : props.size === 'normal'
        ? '16px'
        : '24px'
  )};

&:hover {
  border-color: ${COLOR.black};
  background-color: ${COLOR.black};
  color: ${COLOR.white};
}
`
