import React from "react";

const Category = (props) => {
    return (
        <button className="category_button" onClick={props.onClick}>
            {props.name}
        </button>
    );
};

export default Category;
