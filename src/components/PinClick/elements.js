import styled from 'styled-components'
import {FieldsContainer} from '../AddNewPin/elements'

export const PinClickFieldsContainer = styled(FieldsContainer)`
  justify-items: center;
  grid-template-rows: 15% 50% 20% 15%;
  grid-template-columns: 1fr;
  z-index: 20;
  position: relative;
`

export const PinTitle = styled.div`
  font-family: 'Pacifico', cursive;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const PinTitleText = styled.h2`
  margin-left: 20px;
  font-family: 'Pacifico', cursive;
  @media (max-width: 700px) {
    margin-left: 10px;
  }
`
export const PinClickRow = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const PinClickSecondRow = styled(PinClickRow)`
  height: 90%;
`
