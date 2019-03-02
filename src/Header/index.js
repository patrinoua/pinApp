import React from 'react'
import ListOfLocations from '../ListOfLocations'
import UserMenuPopUp from './components/UserMenuPopUp'
import {
  StyledLink,
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
import {Regular} from '../typography'

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
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.closeUserMenu()
      }
    })
    return (
      <NavigationContainerBig>
        <NavigationContainer>
          <StyledLink to="/map">
            <BrandLogo />
          </StyledLink>
          <NavigationBarRight>
            <StyledLink to="/map">
              <HorizontalContainer>
                <ProfilePicture style={style} />
                <Regular>{this.props.first}</Regular>
              </HorizontalContainer>
            </StyledLink>
            <NavigationSeperatingLine />
            <HorizontalContainer
              onClick={this.showListComponent}
            >
              <AllPinsIcon />
              <Regular>My pins</Regular>
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
