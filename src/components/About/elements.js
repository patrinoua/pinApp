import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Textarea } from '../../elements'

export const MailContainer = styled.div`
  height: 100%;
  width: 100%;
`

export const StyledLink = styled(Link)`
  color: #616161;
  font-size: 25px;
  text-decoration: none;
  padding: 5px 20px;
  border-radius: 8px;
  @media (max-width: 700px) {
    font-size: 15px;
  }
`
export const ConfirmModalText = styled.div`
  text-align: center;
  margin: 12%;
  font-size: 25px;
  @media (max-width: 700px) {
    font-size: 1em;
  }
`
export const ConfirmModal = styled.div`
  position: relative;
  justify-self: center;
  width: 55vw;
  height: 35vh;
  top: 20%;
  border-radius: 15px;
  border: 2px solid #a5a5a5;
  background-color: white;
  @media (max-width: 700px) {
    height: 22vh;
  }
`
export const ModalBG = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: white;
  display: grid;
  animation: textOpacity 1s;
`
export const Date = styled.span`
  font-size: 0.8em;
  @media (max-width: 700px) {
    display: none;
  }
`
export const Contact = styled.div`
  justify-self: center;
  font-size: 30px;
  margin-bottom: 20px;
`
export const MailButton = styled.button``
export const ΙnputContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 5%;
`
export const MailMessage = styled(Textarea)`
  height: 20vh;
  width: 50vw;
  font-size: 15px;
  margin-bottom: 5vh;
  @media (max-width: 400px) {
    width: 70vw;
  }
`
