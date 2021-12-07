import React from 'react'

const Category = (props) => {
    return (
        <div onClick={props.onClick}>{props.name}</div>
    )
}

export default Category