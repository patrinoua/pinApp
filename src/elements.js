import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
`

export const ComponentContainer = styled.div`
  width: 96vw;
  height: 80vh;
  top: 55px;
  padding: 2vw;
  display: flex;
  position: absolute;
`
export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  animation: fadein 1s;
  z-index: 20;
`
export const Textarea = styled.textarea`
  margin-top: 10px;
  resize: none;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 5px;
  max-width: 70%;
`

export const ContainerMap = styled.div`
  position: absolute;
  width: 97%;
  top: 60px;
  height: 85%;
  margin: 5px;
`
export const MapContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`
export const MapContainerRight = styled.div`
  min-width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  margin: 0 5vw;
  position: relative;
  @media (max-width: 400px) {
    width: 100%;
    margin: 5px;
  }
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
  background: white;
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
export const CategoryList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
export const XIcon = styled.p`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 12;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 700px) {
    position: fixed;
    top: 30px;
  }
`
export const Footer = styled.div`
  font-weight: 200;
  width: 98%;
  height: 5vh;
  position: absolute;
  bottom: 0;
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
  &:visited {
    color: #5b5b5b;
    text-decoration: none;
    background: blue;
  }
`
export const PinAppButton = styled.button`
  background-color: #d20607;
  color: white;
  border-radius: 30px;
  font-size: 110%;
  box-shadow: inset -3px -4px 10px 0px rgba(0, 0, 0, 0.2);
  width: 100px;
  border: 2px solid white;
  font-family: Roboto;
  font-weight: 500;
  padding: 5px;
  &:hover {
    background-color: black;
    background-color: #b52519;
  }
`

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  padding: 4px;
  border-radius: 3px;
`
