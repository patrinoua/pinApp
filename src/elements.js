import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 60px;
  height: 85%;
`
export const BlackVail = styled.div`
  margin: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
`
export const MapContainerDown = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
`
export const MapInfoText = styled.div`
  font-size: 0.8em;
  font-weight: 200;
`
export const PopUpShare = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 1vh;
  border: 1px solid grey;
  box-shadow: 1px 1px 11px #dcd5d5;
  height: 20vh;
  width: 16vw;
  top: -17vh;
  left: 13vw;
  background-color: white;
  z-index: 1;
  animation: aaron 6s;
  background-color: #ebeced;
`
export const Footer = styled.div`
  font-weight: 200;
  width: 98%;
  height: 5vh;
  position: absolute;
  bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: #5b5b5b;

  @media (max-width: 700px) {
    font-size: 0.8em;
  }
`
export const FooterElement = styled.a`
  margin-left: 5px;
  &:visited{
    color: #5b5b5b;
    text-decoration: none;
    background: blue;
  }
`
