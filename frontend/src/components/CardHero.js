import React from 'react';
import { Link } from 'react-router-dom';

const ListHeroes = (props) => {
    return (
        <div class="card mt-4" styleName={{width: "18rem"}}>
            <img src={props.image} class="card-img-top" alt="Hero"/>
            <div class="card-body">
                <h4 class="card-title text-center fw-bold p-2">{props.name}</h4>
                <Link to={`/${props.slug}`}>
                    <button class="btn btn-secondary">{props.button}</button>
                </Link>

            </div>
        </div>
    );
};

export default ListHeroes;