import { CSSProperties, PropsWithChildren } from 'react'
import styled from 'styled-components'
import COLOR from '../../lib/colors'
import { StyledIcon } from './StyledIcon'

interface Props {
  expanded: boolean
  onClick?: () => void
  style?: CSSProperties
  title: string
}

const IconWarning = <StyledIcon
  fillColor={COLOR.yellow800}
  hoverFillColor={COLOR.yellow800}
  xmlns="http://www.w3.org/2000/StyledIcon" height="48" viewBox="0 -960 960 960" width="48"><path d="M92-120q-9 0-15.652-4.125Q69.696-128.25 66-135q-4.167-6.6-4.583-14.3Q61-157 66-165l388-670q5-8 11.5-11.5T480-850q8 0 14.5 3.5T506-835l388 670q5 8 4.583 15.7-.416 7.7-4.583 14.3-3.696 6.75-10.348 10.875Q877-120 868-120H92Zm52-60h672L480-760 144-180Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5Zm0-111q12.825 0 21.325-8.625T514-378v-164q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T454-542v164q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM480-470Z" /></StyledIcon>

const IconExpand = <StyledIcon
  fillColor={COLOR.gray600}
  xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-357q-6 0-11-2t-10-7L261-564q-8-8-7.5-21.5T262-607q10-10 21.5-8.5T304-606l176 176 176-176q8-8 21.5-9t21.5 9q10 8 8.5 21t-9.5 22L501-366q-5 5-10 7t-11 2Z" /></StyledIcon>

const WarningBox = styled.div.attrs(
  (props: { expanded: boolean }) => ({ expanded: props.expanded || false }),
)`
  ${({ expanded }) => (`
    border: 1px solid ${COLOR.yellow700};
    padding: 8px 16px;
    border-radius: 4px;
    background-color: ${COLOR.yellow50};
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${COLOR.yellow100};

      svg:last-child { fill: ${COLOR.black}; }
    }

    .styled-warning-box-title {
      display: flex;
      align-items: center;
      margin-bottom: ${expanded ? '8px' : '0px'};

      svg {
        &:first-child { margin-right: 8px; }
        &:last-child { 
          margin-left: 8px; 
          transform: rotate(${expanded ? '180deg' : '0deg'});
        }
      }

      span {
        font-weight: 600;
      }
    }

    .styled-warning-box-list {
      transition: all 0.2s ease-in-out;
      max-height: ${expanded ? '100%' : '0px'};
    }
  `)}
`

export const StyledWarningBox = (props: PropsWithChildren<Props>) => {
  const {
    children,
    expanded,
    onClick,
    style,
    title,
  } = props

  return (
    <WarningBox expanded={expanded} style={style} onClick={onClick}>
      <div className='styled-warning-box-title'>
        {IconWarning}
        <span>{title}</span>
        {IconExpand}
      </div>

      <div className='styled-warning-box-list'>
        {expanded && children}
      </div>
    </WarningBox>
  )
}
