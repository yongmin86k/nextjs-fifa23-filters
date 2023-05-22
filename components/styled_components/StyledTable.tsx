import styled from 'styled-components'
import COLOR from '../../lib/colors'

export const StyledTable = styled.table`
  margin-top: 16px;
  border-collapse: collapse;
  font-size: 12px;
  
  & thead {
    & tr {
      & th {
        background-color: ${COLOR.white};
        background-color: ${COLOR.thBackground};
        padding: 8px 16px;
        border-bottom: 1px solid ${COLOR.blue100};

        &:first-child { border-top-left-radius: 4px; }
        &:last-child { border-top-right-radius: 4px; }
      }
    }
  }

  & tbody {
    & tr {
      & td {
        background-color: ${COLOR.white};
        padding: 8px 16px;
        border-bottom: 1px solid ${COLOR.border};
        text-align: center;

        &:first-child { text-align: left; }
      }

      &:last-child { 
        td:first-child { border-bottom-left-radius: 4px; }
        td:last-child { border-bottom-right-radius: 4px; }

        td { border-bottom-width: 0;}
      }
    }
  }
`
