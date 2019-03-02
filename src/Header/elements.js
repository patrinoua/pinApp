import styled from 'styled-components'

export const HorizontalContainer = styled.div`
  display: flex;
  align-items: center;
`
export const ProfilePicture = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 7px;
  border-radius: 50%;
`
export const BrandLogo = styled.div`
  background-image:url('../../pinAppLogo.png');
  background-size: contain;
  background-position: center;
  width: 50px;
  height: 50px;
`

export const NavigationContainerBig = styled.div`
  width:100%;
  box-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const NavigationSeperatingLine = styled.div`
  height: 7vh;
  border-right: 1px solid lightgrey;
`
export const NavigationContainer = styled.div`
  width: 95%;
  height: 11vh;
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
    margin: 0 5px;
  }
`
export const AllPinsIcon = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 3px;
  background-image: url(../../icons/pinsIcon.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export const HamburgerMenu = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(/assets/menu.png);
  background-size: contain;
  background-position: center;
  filter: invert(0.7);
`
