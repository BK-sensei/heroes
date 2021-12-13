import {BrowserRouter, Routes, Route } from 'react-router-dom'

import { HeroesProvider } from './context/Heroes'
import Home from './pages/Home'
import Hero from './pages/Hero'

const App = () => {

    return (
        <HeroesProvider>
            <BrowserRouter>
                <div className="container m-5">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/:slug" element={<Hero />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </HeroesProvider>
    )
}

export default App;