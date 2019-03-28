import styled from 'styled-components'

export const WelcomeScreenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2vh 0;
  @media (max-width: 400px) {
    font-size: 0.9em;
  }
`
export const WelcomeText = styled.div`
  color: white;
  width: 90%;
  max-width: 500px;
  padding: 2vh;
  font-family: Roboto;
`
export const WelcomeForm = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
  font-family: 'Cutive Mono', monospace;
`

export const WelcomeFormText = styled.div`
  color: white;
  font-family: Roboto;
  font-size: 2em;
  padding: 2vh;
`
export const WelcomeFormInput = styled.input`
  display: block;
  padding: 5px;
  font-size: 14px;
  justify-self: center;
  justify-content: center;
  margin: 5px 0;
`
