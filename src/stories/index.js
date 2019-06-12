import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button, Welcome } from '@storybook/react/demo'
import Option from '../Option'
import MultiOptionsComponent from '../MultiOptionsComponent'
import styled from 'styled-components'
storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))
const icons = ['music', 'eye', 'light', 'heart']
const Icon = styled.img`
  width: 50px;
  height: 50px;
`
storiesOf('Icons', module)
  .add('Grey Icons', () => {
    return (
      <React.Fragment>
        {icons.map(icon => (
          <div>
            <Icon src={`/assets/greyIcons/${icon}Icon.png`} />
          </div>
        ))}
      </React.Fragment>
    )
  })
  .add('Blue Icons', () => {
    return (
      <React.Fragment>
        {icons.map(icon => (
          <div>
            <Icon src={`/assets/blueIcons/${icon}Icon.png`} />
          </div>
        ))}
      </React.Fragment>
    )
  })
storiesOf('Option', module).add('Option', () => (
  <Option icon={'musicIcon'} checkedOptions={() => {}}>
    Play Music
  </Option>
))
storiesOf('MultiOptions', module).add('MultiOptionsComponent', () => (
  <MultiOptionsComponent />
))
