import styled from 'styled-components'

export const CopyUrlContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: wheat;
  justify-content: center;
  align-items: center;
  z-index: 10;
  height: 260px;
  width: 380px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 400px) {
    top: 36%;
    left: 0;
    height: 40%;
    width: 100%;
    transform: none;
  }
`
export const CopyUrlPopUp = styled.div`
padding-top
`
