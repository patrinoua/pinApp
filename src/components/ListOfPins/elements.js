import styled from 'styled-components'

export const ListOfPinsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left:0;
  z-index: 10;
`
export const ListOfLocationsHolder = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

`
export const ListSmallHolder = styled.div`
  min-width: 70vw;
  height: 70vh;
  overflow: scroll;
  background-color: rgb(255, 255, 255);
  padding: 4vw;
  color: black;
  box-shadow: 1px 2px 4px 1px lightgrey;
  z-index: 10;
  position: relative;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }

`
export const XIcon = styled.p`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 12;
  cursor: pointer;
  opacity: 0.4;
  &:hover{
    opacity: .9;
  }
  @media (max-width: 700px) {
    top: 40px;
  }
`
export const ListTitle = styled.div`
  font-size: 2em;
  padding-bottom: 4vh;
  @media (max-width: 700px) {
    padding-top: 4vh;
  }
`
export const EachPin = styled.div`
  width: 100%;
  display: grid;
  font-size: 1em;
  grid-template-columns: 10% 25% 40% 25%;
  align-items: center;
  grid-column-gap: 0.5vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
  border-radius: 20px;
  &:hover{
    cursor: pointer;
    background-color: #f5f5f5;
  }
  @media (max-width: 700px) {
    grid-template-columns: 30% 70%;
    >:nth-child(2){
      text-align: left;
    }
  }
`
export const PinImage = styled.img`
width: 4vw;
min-width: 30px;
justify-self:center;
padding: 5px;
`
export const Description = styled.span`
  overflow: scroll;
  font-size: 0.9em;
  font-style: italic;
  padding: 5px;
  margin: 10px;
  @media (max-width: 700px) {
    display: none;
  }
`
export const Date = styled.span`
  font-size: 0.8em;
  @media (max-width: 700px) {
    display: none;
  }
`
