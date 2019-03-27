import React from 'react'
import {Link} from 'react-router-dom'
import {NamesToShow} from './NamesToShow'
import {DropDownMenu, DropDownMenuLinkItem, DropDownMenuItem} from './elements'

export default class UserMenuPopUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.closePopUp = this.closePopUp.bind(this)
  }
  closePopUp() {
    this.props.closeUserMenu()
  }
  render() {
    document.addEventListener('anim', e => {
      if (e.keyCode === 27) {
        this.props.closeUserMenu()
      }
    })
    return (
      <React.Fragment>
        <div
          id="overley"
          onClick={ e => {
            this.props.closeUserMenu()
          }}
        />
        <DropDownMenu id="anim">
          <DropDownMenuLinkItem
            to="/friends"
            onClick={() => {
              setTimeout(this.props.closeUserMenu, 200)
            }}
          >
            Friends
          </DropDownMenuLinkItem>
          <DropDownMenuLinkItem
            to="/profile"
            onClick={() => {
              this.props.closeUserMenu()
            }}
          >
            Edit Profile
          </DropDownMenuLinkItem>
          <DropDownMenuItem href="/logout" >
            Logout
          </DropDownMenuItem>
          <NamesToShow id={this.props.id} />
        </DropDownMenu>
      </React.Fragment>
    )
  }
}
