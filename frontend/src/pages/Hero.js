import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { HeroesContext } from '../context/Heroes';
import CardHero from '../components/HeroDetails';

const Hero = () => {
    const [hero, setHero]= useState(null)

    const { slug } = useParams()

    useEffect (() => {
        fetch(`http://localhost:5000/heroes/${slug}`)
        .then(response => response.json())
        .then(data => setHero(data))

    }) 
    if (!hero){
        return <p>Loading...</p>
    }
    return (
        <div>
            <h1 className="bg-dark text-white text-center fw-bold">{hero.name}</h1>
            <div>
                <CardHero
                        key={hero.slug}
                        power={hero.power}
                        color={hero.color}
                        isAlive={hero.isAlive}
                        age={hero.age}
                        image={hero.image}
                />
            </div>
        </div>
    )
}

export default Hero