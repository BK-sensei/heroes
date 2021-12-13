import React from 'react';
// import { HeroesContext } from '../context/Heroes';

const CardHero = (props) => {
    return (
        <div class="card mt-4" styleName={{width: "18rem"}}>
            <img src={props.image} class="card-img-top" alt="Hero"/>
            <div class="card-body">
                <h4 class="card-title bg-dark text-white text-center fw-bold p-2">{props.name}</h4>
                <p class="card-text">Power: {props.power}</p>
                <p class="card-text">Age: {props.age}</p>
                <p class="card-text">Color: {props.color}</p>
                <p class="card-text">Is this hero alive: {props.isAlive}</p>
            </div>
        </div>
    );
};

export default CardHero;