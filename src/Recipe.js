import React from 'react';
import style from './recipe.module.css'

const Recipe = (props) => {
    return (
        <div className={style.recipe}>
            <h1>{props.title}</h1>
            <p>Calories: {Math.trunc(props.calories)}</p>
            <img src={props.imageUrl} alt={props.imageAlt} className={style.image}></img>
            <ul>
                {props.ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient.text}</li>
                })}
            </ul>
        </div>
    );
}

export default Recipe;