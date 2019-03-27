import styled from 'styled-components'
import { PinAppButton } from '../../elements'

export const OtherUserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
export const OtherUserContainerUp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const ProfilePicUser = styled.div`
  min-width: 65px;
  min-height: 65px;
  width: 15vh;
  height: 15vh;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center center;
  background-size: cover;
  margin-left: 10vh;
  @media (max-width: 400px) {
    margin-left: 20px;
  }
`
export const NameAndBioContainerUser = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2vh;
`

export const UserName = styled.div`
  padding: 1vh;
`
export const UserBio = styled.div`
  padding: 1vh;
  font-style: italic;
  font-family: cursive;
  color: #2a2a2a;
`
export const OtherUserContainerFriendshipButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 8vh;
  @media (max-width: 400px) {
    margin-right: 20px;
  }
`
export const OtherUserContainerDown = styled.div`
  width: 100%;
  height: 85%;
  align-items: center;
  display: flex;
`
export const OtherUserContainerDownLeft = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 400px) {
    display: none;
  }
`

export const OtherUserContainerDownRight = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    width: 100%;
  }
`
export const MapContainer = styled.div`
  background-size: contain;
  border-radius: 3px;
  box-shadow: 2px 2px 7px -2px rgba(0, 0, 0, 0.4);
  height: 80%;
  width: 80%;
  position: relative;
  @media (max-width: 400px) {
    height: 94%;
    width: 94%;
  }
`

export const Form = styled.form`
  margin-bottom: 50px;
`
export const UsersPinsButton = styled(PinAppButton)`
  @media (max-width: 400px) {
    position: absolute;
    bottom: 0;
  }
`
