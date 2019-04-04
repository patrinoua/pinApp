import styled from 'styled-components'
import { SubtleButton } from '../../elements'

export const ProfilePageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 400px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`
export const ProfilePageContainerLeft = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    width: 100%;
    height: 30%;
  }
`
export const ProfilePageContainerRight = styled.div`
  height: 40%;
  width: 40%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 2vh;
  @media (max-width: 400px) {
    width: 100%;
    height: 40%;
  }
`
export const DeleteAccountButton = styled(SubtleButton)`
  position: absolute;
  right: 20px;
  bottom: 0%;
  font-size: 0.8em;
  @media (max-width: 400px) {
    left: 30%;
  }
`

export const ProfilePictureContainer = styled.div`
  position: relative;
  padding: 9px;
`

export const ProfilePictureCircle = styled.div`
  width: 20vw;
  height: 20vw;
  min-width: 100px;
  min-height: 100px;
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 3px solid rgba(0, 0, 0, 0.2);
  background-position: center center;
  background-size: cover;
`
export const ProfileInfoContainer = styled.div`
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
export const InputFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 15vh 15vh;
  justify-items: start;
  padding: 3px;
`
export const FieldsContainer = styled.div`
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 400px) {
    padding-top: 0;
    font-size: 0.9em;
  }
`
export const FieldName = styled.div`
  color: lightgrey;
  padding: 2px;
`

export const FieldValue = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
export const StyledInput = styled.input`
  width: 90px;
`
export const EditButtonsContainer = styled.div`
  width: 70%;
  position: absolute;
  bottom: -40px;
  right: 0;
  display: flex;
  justify-content: center;
`
export const StyledTextarea = styled.input`
  width: 15vh;
  height: 67px;
  border: 0.5px solid lightgrey;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  overflow: auto;
  resize: none;
  outline: none;
`
export const HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
export const DeleteAccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const DeleteAccountWindowPopUp = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 20px;
  box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.5);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`
export const DeletingAccountButton = styled.button`
  width: 90%;
  height: 50px;
`
export const EditProfilePictureIcon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 20px;
  top: 20px;
  opacity: 0.25;
  padding: 10px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    height: 15px;
    width: 15px;
    padding: 7px;
  }
`
