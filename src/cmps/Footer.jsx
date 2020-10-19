import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <footer className="grid-container">
                <section className="flex space-between">
                    <div>
                        <Link to="/" exact='true' >Home</Link>
                    </div>
                    <div>
                        <Link to={`/search?q=query=Pastries`} >Pastries</Link>
                        <Link to={`/search?q=query=Beef`} >Beef</Link>
                    </div>
                    <div>
                        <NavLink exact to="/search?q=diet=vegan">Vegan</NavLink>
                        <NavLink exact to="/search?q=diet=gluten free">Gluten Free</NavLink>
                    </div>
                    <div>
                        <NavLink exact to="/search?q=type=dessert">Dessert</NavLink>
                        <NavLink exact to="/search?q=type=breakfast">Breakfast</NavLink>
                    </div>
                </section>
            </footer>
        )
    }
}
