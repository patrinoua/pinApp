import styled from 'styled-components'
import { ComponentContainer } from '../elements'

export const AboutContainer = styled(ComponentContainer)`
  flex-direction: column;
  position: relative;
`
export const Headline = styled.div`
  margin-top: 20px;
  justify-self: center;
  font-size: 30px;
`
export const Summary = styled.div``
export const SummaryBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
export const SummaryParagraph = styled.div`
  margin: 20px;
  width: 50vw;
  text-align: left;
  position: relative;
  @media (max-width: 700px) {
    width: auto;
  }
`

export const Li = styled.li`
  text-align: left;
  margin-bottom: 10px;
`
export const Ul = styled.ul`
  @media (max-width: 700px) {
    padding-right: 10px;
  }
`
