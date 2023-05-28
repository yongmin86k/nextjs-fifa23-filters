import styled from 'styled-components'
import COLOR from '../../lib/colors'
import { StyledButton } from './StyledButton'

// TODO: figure out how to update SVG color on hover
export const StyledIcon = styled.svg.attrs(
  (props: {
    fillColor?: string
    hoverFillColor?: string
  }) => ({
    fillColor: props.fillColor || COLOR.black,
    hoverFillColor: props.hoverFillColor || COLOR.white,
  }),
)`
${({ fillColor, hoverFillColor }) => (`
  width: 24px;
  height: 24px;
  fill: ${fillColor};
  transition: all 0.2s ease-in-out;

  ${StyledButton}:hover & {
    fill: ${hoverFillColor};
  }; 
`)}
`
