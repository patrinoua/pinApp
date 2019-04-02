import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PendingFriends = styled.div`
  padding-bottom: 0;
  width: 100%;
  height: 83vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`
export const FriendBox = styled(Link)`
  margin: 10px;
  display: flex;
  color: black;
  min-width: 300px;
  border-radius: 20px;
  align-items: center;
  position: relative;
  padding: 10px;
  flex-shrink: 0;
  border: 1px solid lightgray;
  border-bottom: 2px solid lightgray;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 400px) {
    width: auto;
    min-width: auto;

    flex-direction: column;
    align-items: center;
  }
  &: visited {
    color: black;
  }
`

export const PendingFriendBox = styled(FriendBox)`
  width: 500px;
`

export const RemoveFriendXImage = styled.img`
  height: 15px;
  width: 15px;
  margin: 10px;
  position: absolute;
  align-self: flex-end;
  top: 10px;
  right: 30px;
  filter: opacity(30%);
  &:hover {
    filter: opacity(50%);
  }
`
export const PictureContainer = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  @media (max-width: 400px) {
    margin-bottom: 0;
  }
`
export const ExistingFriendsList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  /* height: 40%; */
  flex-shrink: 0;
`
export const AcceptDeny = styled.div`
  width: 170px;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  @media (max-width: 400px) {
    position: relative;
    margin-right: 0;
    height: 40px;
  }
`
export const PendingAccept = styled.div`
  width: 125px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 400px) {
    width: auto;
  }
`
