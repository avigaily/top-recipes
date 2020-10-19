import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import recipeService from '../recipeService'
import CarouselSlick from '../cmps/CarouselSlick'

export default class Home extends Component {
    state = {
        cake: null,
        lowCalorie: null,
        categories: [
            {
                string: 'Soups',
                image: 'https://images.unsplash.com/photo-1530734575165-ce39d996fbaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
            },
            {
                string: 'Pastries',
                image: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=733&q=80'
            },
            {
                string: 'Beef',
                image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            },
            {
                string: 'Sandwiches',
                image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            },
            {
                string: 'Desserts',
                image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            },
            {
                string: 'Drinks',
                image: 'https://images.unsplash.com/photo-1584587727565-a486d45d58b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
            }
        ]
    }

    componentDidMount() {
        this.loadRecipes()
    }

    loadRecipes = async () => {
        const cakes = await recipeService.query(`?q=query=cake`, 5)
        const lowCalorie = await recipeService.query(`?q=maxCalories=200`, 5)
        this.setState({ cake: cakes, lowCalorie: lowCalorie })
    }

    render() {
        return (!this.state.cake) ? 'loading' : (
            <section>
                <section className="hero">
                </section>
                <section className="top-categories ">
                    {this.state.categories.map((category, idx) => {
                        return (
                            <Link className="category" key={idx} to={`/search?q=query=${category.string}`} >
                                <div >
                                    <div className="img-container">
                                        {/* <img src={require(`../images/${category.image}`)} /> */}
                                        <img src={category.image} alt="" />
                                    </div>
                                    <h5>{category.string}</h5>
                                </div>
                            </Link>)
                    })}
                </section>
                <section className="wrapper ">
                    <CarouselSlick recipes={this.state.cake} />
                </section>
                <section className="wrapper ">
                    <CarouselSlick recipes={this.state.lowCalorie} />
                </section>
            </section>
        )
    }
}
