import React from "react";

import classes from "./Order.module.css"

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            amount: props.ingredients[ingredientName],
            name: ingredientName
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: "capitalize",
                    margin: "0 8px",
                    padding: "5px",
                    display: "inline-block",
                    border: "1px solid #ccc"
                }}>
                {ig.name} ({ig.amount})
            </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>total price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;