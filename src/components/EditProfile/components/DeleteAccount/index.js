import React from 'react'
import axios from '../../../../axios'
import {
  DeleteAccountContainer,
  DeleteAccountWindowPopUp,
  DeletingAccountButton
} from './elements'

export default class DeleteAccount extends React.Component {
  render() {
    return (
      <DeleteAccountContainer>
        <DeleteAccountWindowPopUp>
          Are you sure you want to delete your account?
          <DeletingAccountButton
            onClick={() => {
              axios.get('deleteUserAccount').then(response => {
                location.replace('/welcome')
              })
            }}
          >
            {' '}
            Yes, I want to delete my account and all my pins{' '}
          </DeletingAccountButton>
          <DeletingAccountButton
            onClick={() => {
              this.props.toggleDeleteProfile()
            }}
          >
            {' '}
            Cancel{' '}
          </DeletingAccountButton>
        </DeleteAccountWindowPopUp>
      </DeleteAccountContainer>
    )
  }
}
