import styled from 'styled-components'
import Colors from '../../constants/colors'
import { BlackVail } from '../elements'
const lettersColor = Colors.darkGray
const backgroundColor = Colors.white

export const BlackVailPinClick = styled(BlackVail)`
  z-index: 15;
  opacity: 0.5;
`
export const FieldsContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 70vw;
  height: 70vh;
  max-width: 500px;
  max-height: 500px;
  background-color: ${backgroundColor};
  border-radius: 2px;
  box-shadow: 1px 1px 11px -4px lightgrey;
  z-index: 10;
  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
    position: absolute;
    border: none;
    max-width: 600px;
    max-height: 100%;
  }
`
export const FieldsContainerNewPin = styled(FieldsContainer)`
  position: relative;
  grid-template-rows: 20% 60% 20%;
  grid-template-columns: 1fr;
  @media (max-width: 700px) {
    grid-template-rows: 25% 50% 25%;
  }
`
export const PinText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  @media (max-width: 700px) {
    font-size: 0.8em;
    padding-left: 5px;
  }
`
export const PinCategory = styled.div`
  display: flex;
  color: ${lettersColor};
  height: 50px;
  @media (max-width: 700px) {
    height: 34px;
  }
`
export const PinCheckboxArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
export const PinCheckbox = styled.img`
  height: 13px;
  width: 13px;
  opacity: 0.5;
  padding: 10px;
  &: hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    height: 13px;
    width: 13px;
  }
`
export const PinIcon = styled.img`
  max-width: 25px;
  height: auto;
  padding-right: 10px;
  @media (max-width: 700px) {
    max-width: 20px;
    padding-right: 5px;
  }
`
export const PinTitleArea = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  padding-bottom: 20px;
  // z-index: 12;
`
export const PinTitle = styled.span`
  font-family: 'Pacifico', cursive;
  font-size: 2em;
  color: ${lettersColor};
`
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const PinAppButton = styled.button`
  background: lightgreen;
  color: white;
  /* color: ${lettersColor}; */
  border: none;
  border-radius: 20px;
  width: 120px;
  height:40px;
  margin: 0;
`
export const SaveButton = styled(PinAppButton)`
  font-size: 1.2em;
  margin: 20px;
  font-family: 'Pacifico', cursive;
  background: none;
  color: ${lettersColor};
  border: none;
`

export const SaveCancelArea = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
export const CloseModalX = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 20px;
  top: 20px;
  color: black;
  font-size: 20px;
  z-index: 100;
  @media (max-width: 700px) {
    right: 20px;
    top: 20px;
  }
`
export const PinMenu = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const AddPinPicture = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`
export const PinOptions = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;
  justify-items: center;
`

export const CameraIconContainer = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: rgba(254, 228, 241, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`
export const TitleAndDescription = styled.div`
  width: 90%;
  position: relative;
`
