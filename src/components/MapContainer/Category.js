import React from 'react'
import PropTypes from 'prop-types'

const Category = ({ color, category, checkCategory }) => {
  const label = category.charAt(0).toUpperCase() + category.substring(1)
  const style = {
    backgroundSize: 'contain'
  }
  let pinUrl = `/pins/${color}Pin.png`
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
        src={pinUrl}
        className='categoryItemPinIcon'
        alt='categoryItemPinIcon'
      />
      <label htmlFor={category} className='pinText'>
        {label}
      </label>
    </div>
  )
}

Category.propTypes = {
  color: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  checkCategory: PropTypes.func.isRequired
}

export default Category
