import React from 'react'
import { ButtonContainer, PinAppButton } from '../../AddNewPin/elements.js'
import { CopyUrlContainer } from './elements.js'

export const DeletePinAlert = ({ deletePinAlert, toggleDeleteAlert }) => (
  <div className="blackVailDelete">
    Are you sure you want to delete this pin?
    <div className="inARow">
      <button
        onClick={() => {
          deletePinAlert()
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          toggleDeleteAlert()
        }}
      >
        No
      </button>
    </div>
  </div>
)

export const ShareButton = ({ togglePinUrl, exportPin, pinUrl }) => (
  <ButtonContainer>
    <PinAppButton
      onClick={() => {
        exportPin()
      }}
    >
      Copy Link
    </PinAppButton>
    {pinUrl && (
      <CopyUrlContainer>
        <div
          className="closeCopyUrlVail"
          onClick={() => {
            togglePinUrl(null)
          }}
        >
          {' '}
          X
        </div>
        <div>{pinUrl} </div>
        <br />
        <div>link copied to clipboard</div>
      </CopyUrlContainer>
    )}
  </ButtonContainer>
)
export const EditButton = ({ userCanEdit, toggleEditMode }) => {
  if (userCanEdit) {
    return (
      <div className="pinEditSaveButtonArea box">
        <h1
          className="saveButton"
          onClick={() => {
            toggleEditMode()
          }}
        >
          {' '}
          edit{' '}
        </h1>
      </div>
    )
  } else {
    return <div />
  }
}
