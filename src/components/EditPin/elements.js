import styled from 'styled-components'
import { XIcon } from '../elements.js'
export const EditPinFieldsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 20;
  width: 70vw;
  height: 70vh;
  max-width: 500px;
  max-height: 500px;
  background: white;
  border-radius: 2px;
  box-shadow: 1px 1px 11px -4px lightgrey;

  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
    position: absolute;
    border: none;
    max-width: 600px;
    max-height: 100%;
  }
`
export const UnpinButton = styled(XIcon)`
  top: 60px;
  right: 30px;
  @media (max-width: 700px) {
    top: 55px;
  }
`

export const SaveCancelButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`
