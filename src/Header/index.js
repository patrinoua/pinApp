import React from 'react'
import {Link} from 'react-router-dom'
import {NamesToShow} from '../NamesToShow'
import ListOfLocations from '../ListOfLocations'
import {
  BrandLogo,
  ProfilePicture,
  HorizontalContainer,
  NavigationContainer,
  NavigationContainerBig,
  NavigationSeperatingLine,
  NavigationBarRight,
  AllPinsIcon,
  HamburgerMenu,
} from './elements'

export default class Header extends React.Component {
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
      backgroundImage: `url(${pic})`,
      backgroundSize: 'contain'
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.closeUserMenu()
      }
    })
    return (
      <NavigationContainerBig>
        <NavigationContainer>
          <Link to="/map">
            <BrandLogo />
          </Link>
          <NavigationBarRight>
            <Link to="/map">
              <HorizontalContainer>
                <ProfilePicture style={style} />
                <span>{this.props.first}</span>
              </HorizontalContainer>
            </Link>
            <NavigationSeperatingLine />
            <HorizontalContainer
              onClick={this.showListComponent}
            >
              <AllPinsIcon />
              My pins
            </HorizontalContainer>
            <HamburgerMenu
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
          </NavigationBarRight>
        </NavigationContainer>
      </NavigationContainerBig>
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
