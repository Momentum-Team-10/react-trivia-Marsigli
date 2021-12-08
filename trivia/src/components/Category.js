import React from 'react'

const Category = (props) => {
    return (
        <button onClick={props.onClick}>{props.name}</button>
    )
}

export default Category