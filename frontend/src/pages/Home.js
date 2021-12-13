import React, {useContext} from 'react';
import { HeroesContext } from '../context/Heroes';
import ListHeroes from '../components/CardHero';

const Home = () => {
    const { heroes } = useContext(HeroesContext)
    // console.log("mes heros", heroes);
    return (
        <div>
            <h1 className="text-center fw-bold">List of Heroes</h1>
            <div>
                {heroes.map(hero => (
                    <ListHeroes
                        key={hero.slug}
                        slug={hero.slug}
                        name={hero.name}
                        image={hero.image}
                        button="Détails"
                    />
                ))}
            </div>
        </div>
    )
}

export default Home