import React from 'react'
import ListOfPins from '../components/ListOfPins'
import UserMenuPopUp from './components/UserMenuPopUp'
import {
  StyledRegular,
  StyledLink,
  BrandLogo,
  NavigationIcon,
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
    console.log('ooooppppp')
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
      borderRadius: '50%'
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
                <NavigationIcon style={style} />
                <StyledRegular>{this.props.first}</StyledRegular>
              </HorizontalContainer>
            </StyledLink>
            <NavigationSeperatingLine />
            <HorizontalContainer
              onClick={this.showListComponent}
            >
              <AllPinsIcon />
              <StyledRegular>My pins</StyledRegular>
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
              <ListOfPins closeListComponent={this.closeListComponent} />
            )}
          </NavigationBarRight>
        </NavigationContainer>
      </NavigationContainerBig>
    )
  }
}
