import styled from 'styled-components'

export const DeleteAccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
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
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 400px) {
    width: 100%;
    height: 60%;
    margin: 0;
    border-radius: 0;
  }
`
export const DeletingAccountButton = styled.button`
  width: 90%;
  height: 50px;
`
