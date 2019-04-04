import React from 'react'
import Contact from './components/Contact'
import {
  Headline,
  SummaryContainer,
  Summary,
  Ul,
  Li,
  AboutContainer
} from './elements'
class About extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <AboutContainer>
        <Headline>About</Headline>
        <SummaryContainer>
          <Summary>
            PinApp is a hobby Web Application built with React and Node, that
            started as a final project for Spiced Academy Coding Bootcamp in
            Berlin, in May of 2018. It continues to be developed and will soon
            also be available as mobile application, built with React Native.
          </Summary>
          <Summary>
            If you have any feedback, suggestions, features you would like to
            see, would like to contribute in Design or Development, or just want
            to say hi, feel free to come in contact by using the form below.
          </Summary>
        </SummaryContainer>
        <Headline>Features</Headline>
        <SummaryContainer>
          <Ul>
            <Li>
              Add a Pin in your current location or any place on the map and add
              to it specific information such as a Title, Description and a
              photo.
            </Li>
            <Li>Share your pins with other people</Li>
            <Li>Add people as Friends and see their Pins</Li>
            <Li>See a List of all your Pins</Li>
            <Li>
              Filter Pins by Category (eg. only See Restaurants, or Restaurants
              and Bars)
            </Li>
          </Ul>
        </SummaryContainer>
        <Contact>
          <Headline>Contact</Headline>
          <SummaryContainer>
            <Summary>
              If you have any feedback, suggestions, features you would like to
              see, would like to contribute in Design or Development, or just
              want to say hi, feel free to come in contact by using the form
              below.
            </Summary>
          </SummaryContainer>
        </Contact>
      </AboutContainer>
    )
  }
}

export default About
