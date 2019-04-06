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
