import React from 'react'
import {Link} from 'react-router-dom'
import {NamesToShow} from './NamesToShow'
import ListOfLocations from './ListOfLocations.js'

export class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userMenuIsVisible: false
    }
    this.toggleUserMenu = this.toggleUserMenu.bind(this)
    this.closeUserMenu = this.closeUserMenu.bind(this)
    this.showListComponent = this.showListComponent.bind(this)
    this.closeListComponent = this.closeListComponent.bind(this)
  }
  showListComponent(e) {
    this.setState({
      showListComponent: true
    })
  }
  closeListComponent(e) {
    this.setState({
      showListComponent: false
    })
  }
  toggleUserMenu() {
    this.setState({
      userMenuIsVisible: !this.state.userMenuIsVisible
    })
  }
  closeUserMenu() {
    this.setState({
      userMenuIsVisible: false
    })
  }
  render() {
    let pic = this.props.profilepic || '/user.png'
    const style = {
      backgroundImage: `url(${pic})`
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode == 27) {
        this.closeUserMenu()
      }
    })
    return (
      <div className="navigationContainerBig">
        <div className="navigationContainer">
          <Link to="/map" className="navigationBarRight">
            <img className="logoIconMenu" src="/pinAppLogo.png" />
          </Link>
          <div className="navigationBarRight">
            <Link to="/map">
              <div className="navigationIconProfilepicCircle" style={style} />
            </Link>
            {this.props.first}
            <div className="navigationSeperatingLine" />
            <img
              src="/icons/pinsIcon.png"
              alt="pinsIcon"
              className="navigationIcon"
              onClick={this.showListComponent}
            />
            <img
              src="/assets/menu.png"
              alt="menu"
              className="navigationIcon menuIcon"
              onClick={this.toggleUserMenu}
            />
            {this.state.userMenuIsVisible && (
              <UserMenuPopUp
                id={this.props.id}
                toggleUserMenu={this.toggleUserMenu}
                closeUserMenu={this.closeUserMenu}
                userMenuIsVisible={this.state.userMenuIsVisible}
              />
            )}
            {this.state.showListComponent && (
              <ListOfLocations closeListComponent={this.closeListComponent} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export class UserMenuPopUp extends React.Component {
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
          onClick={e => {
            this.props.closeUserMenu()
            // e.stopPropagation();
            // e.preventDefault();
          }}
        />
        <div className="dropDownMenu" id="anim">
          {/*onMouseLeave={() => {
                    this.props.closeUserMenu();
                }}*/}
          <Link
            to="/friends"
            className="dropDownMenuItem"
            onClick={() => {
              setTimeout(this.props.closeUserMenu, 200)
            }}
          >
            Friends
          </Link>
          <Link
            to="/profile"
            className="dropDownMenuItem"
            onClick={() => {
              this.props.closeUserMenu()
            }}
          >
            Edit Profile
          </Link>
          <a href="/logout" className="dropDownMenuItem">
            Logout
          </a>
          <NamesToShow id={this.props.id} />
        </div>
      </React.Fragment>
    )
  }
}
