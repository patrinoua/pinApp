import React from 'react'

export const categoryItems = function(color, text, variable, myFunction) {
  let str = '/pins/' + color + 'Pin.png'
  return (
    <div className="categoryItem">
      <input
        type="checkbox"
        id={variable}
        name={variable}
        value={variable}
        className="check"
        onClick={myFunction}
      />
      <img
        src={str}
        alt="categoryItemPinIcon"
        className="categoryItemPinIcon"
      />
      <label htmlFor="museums" className="pinText">
        {' '}
        {text}{' '}
      </label>
    </div>
  )
}
