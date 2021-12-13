import React from 'react';

const CardHero = (props) => {
    return (
        <div class="card mt-4" styleName={{width: "18rem"}}>
            <img src={props.image} class="card-img-top" alt="Hero"/>
            <div class="card-body">
                <p class="card-text">Power: {props.power}</p>
                <p class="card-text">Age: {props.age}</p>
                <p class="card-text">Color: {props.color}</p>
                <p class="card-text">Is this hero alive: {props.isAlive}</p>
            </div>
        </div>
    );
};

export default CardHero;