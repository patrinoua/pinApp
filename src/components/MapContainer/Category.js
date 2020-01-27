import React from 'react'

const Category = ({ color, category, checkCategory }) => {
  const text = category.charAt(0).toUpperCase() + category.substring(1)
  const style = {
    backgroundSize: 'contain'
  }
  let str = '/pins/' + color + 'Pin.png'
  return (
    <div className='categoryItem'>
      <input
        style={style}
        type='checkbox'
        id={category}
        name={category}
        value={category}
        className='check'
        onClick={checkCategory}
      />
      <img
        src={str}
        className='categoryItemPinIcon'
        alt='categoryItemPinIcon'
      />
      <label htmlFor={category} className='pinText'>
        {text}
      </label>
    </div>
  )
}

export default Category
