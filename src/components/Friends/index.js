import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  receiveFriends,
  removeFriend,
  acceptFriend,
  denyFriend
} from '../../actions'
import { ComponentContainer } from '../../elements'
import {
  PendingFriends,
  FriendBox,
  RemoveFriendXImage,
  PictureContainer,
  ExistingFriendsList,
  AcceptDeny,
  PendingAccept
} from './elements'

class Friends extends React.Component {
  componentDidMount() {
    this.props.dispatch(receiveFriends())
  }

  friendFormat(friend, type) {
    const pic = friend.profilepic || 'user.png'
    if (type === 'exists') {
      return (
        <FriendBox to={`user/${friend.id}`} key={friend.id}>
          <PictureContainer style={{ backgroundImage: `url(${pic})` }} />
          {friend.first} {friend.last}
        </FriendBox>
      )
    } else {
      return (
        <div key={friend.id}>
          <FriendBox to={`user/${friend.id}`} key={friend.id}>
            <PictureContainer style={{ backgroundImage: `url(${pic})` }} />
            {friend.first} {friend.last}
            <AcceptDeny>
              <PendingAccept
                onClick={() => {
                  this.props.dispatch(acceptFriend(friend.id))
                }}
              >
                Accept
                <img src="tick.png" className="icons" alt="tick" />
              </PendingAccept>
              <PendingAccept
                onClick={() => {
                  this.props.dispatch(denyFriend(friend.id))
                }}
              >
                Deny
                <img src="x.png" className="icons" alt="x" />
              </PendingAccept>
            </AcceptDeny>
          </FriendBox>
        </div>
      )
    }
  }
  render() {
    const { friends } = this.props
    if (!friends) {
      return null
    }
    const existingFriends = this.props.existingFriends.map(existing => {
      return this.friendFormat(existing, 'exists')
    })

    const pendingFriends = this.props.pendingFriends.map(pending => {
      return this.friendFormat(pending, 'pending')
    })

    return (
      <ComponentContainer>
        <PendingFriends>
          <h1> Pending Friends </h1>
          <div className="pendingFriends">
            <div className="pendingFriendsList">{pendingFriends}</div>
          </div>
          <h1> Friends </h1>
          <ExistingFriendsList>{existingFriends}</ExistingFriendsList>
        </PendingFriends>
      </ComponentContainer>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    friends: state.friends && state.friends.filter(friends => friends),
    existingFriends:
      state.friends && state.friends.filter(friends => friends.status === 3),
    pendingFriends:
      state.friends && state.friends.filter(friends => friends.status === 1)
  }
}

export default connect(mapStateToProps)(Friends)
