import styled from 'styled-components'
import COLOR from '../../lib/colors'

export const StyledButton = styled.button.attrs(
  (props: { componentSize: 'small' | 'normal' | 'large' }) => ({
    componentSize: props.componentSize || 'normal',
  }),
)`
display: flex;
align-items: center;
padding: 8px 16px;
border-radius: 4px;
border: 1px solid ${COLOR.border};
background-color: ${COLOR.white};
cursor: pointer;
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
