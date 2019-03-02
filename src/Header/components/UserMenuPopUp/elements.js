import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const DropDownMenu = styled.div`
  position: absolute;
  padding: 1vw;
  width: 9vw;
  min-width: 120px;
  top: 9vh;
  right: 0vw;
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 4px 1px lightgrey;
  border-radius: 2px;
  flex-direction: column;
  align-items: center;
  z-index: 13;
  transition: opacity 2s ease-in;
  &:hover{
    color: #51B3C4;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    top: 60px;
  }
`
export const DropDownMenuLinkItem = styled(Link)`
  color: #2a2a2a;
  padding: 5px;
  font-weight: 900;
  &:hover{
    color: #51B3C4;
    cursor: pointer;
  }
`
export const DropDownMenuItem = styled.a`
  color: #2a2a2a;
  padding: 5px;
  font-weight: 900;
  &:hover{
    color: #51B3C4;
    cursor: pointer;
  }
`
