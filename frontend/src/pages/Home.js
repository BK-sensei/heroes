import React, {useContext} from 'react';
import { HeroesContext } from '../context/Heroes';
import CardHero from '../components/CardHero';

const Home = () => {
    const { heroes } = useContext(HeroesContext)
    // console.log("mes heros", heroes);
    return (
        <div>
            <h1 className="text-center fw-bold">List of Heroes</h1>
            <div>
                {heroes.map(hero => (
                    <CardHero
                        key={hero.slug}
                        name={hero.name}
                        power={hero.power}
                        color={hero.color}
                        isAlive={hero.isAlive}
                        age={hero.age}
                        image={hero.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home