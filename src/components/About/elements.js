import styled from 'styled-components'
import { ComponentContainer } from '../elements'

export const AboutContainer = styled(ComponentContainer)`
  flex-direction: column;
`
export const Headline = styled.div`
  margin-top: 30px;
  justify-self: center;
  font-size: 30px;
  margin-bottom: 20px;
`
export const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`
export const Summary = styled.div`
  margin: 10px 0;
  width: 50vw;
  text-align: left;
  @media (max-width: 700px) {
    width: 80vw;
  }
`

export const Li = styled.li`
  text-align: left;
  margin-bottom: 10px;
`
export const Ul = styled.ul`
  width: 50vw;
  @media (max-width: 700px) {
    width: 80vw;
  }
`
