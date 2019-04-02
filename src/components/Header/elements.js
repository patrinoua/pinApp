import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Regular } from '../../typography'

export const StyledRegular = styled(Regular)`
  @media (max-width: 700px) {
    display: none;
  }
`
export const NavigationIcon = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 7px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media (max-width: 700px) {
    margin-right: 0;
  }
`
export const AllPinsIcon = styled(NavigationIcon)`
  width: 27px;
  height: 35px;
  // z-index: 9;
  background-image: url(../../icons/pinsIcon.png);
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  &: visited {
    color: #2a2a2a;
  }
`
export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
`
export const BrandLogo = styled.div`
  background-image: url('../../pinAppLogo.png');
  background-size: contain;
  background-position: center;
  width: 50px;
  height: 50px;
`

export const NavigationContainerBig = styled.div`
  width: 100%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  position: fixed;
  z-index: 1;
`
export const NavigationSeperatingLine = styled.div`
  height: 35px;
  border-right: 1px solid lightgrey;
  @media (max-width: 700px) {
    display: none;
  }
`
export const NavigationContainer = styled.div`
  width: 100%;
  margin: 0 10px;
  height: 60px;
  max-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 8;
  > div {
    cursor: pointer;
  }
`
export const NavigationBarRight = styled.div`
  /* width: 260px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    margin-right: 15px;
  }
`

export const HamburgerMenu = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/assets/menu.png);
  background-size: contain;
  background-position: center;
  filter: invert(0.4);
`
