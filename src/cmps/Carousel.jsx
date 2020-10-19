import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class DemoCarousel extends Component {
    state={
        shown:[0,1,2,3]
    }

    onMoveCarousel = () => {

    }

    render() {
        const {recipes} = this.props
        return (
            <section className="carousel flex">
                {/* <button className="prev" onClick={}>
                    Prev
                </button> */}
               {this.state.shown.map(idx => {
                   let recipe = recipes[idx] 
                   return (
                       <Link key={idx} to={`/${recipe.id}`} >
                            <div key={recipe.id} className="flex column justify-center">
                                <div className="img-container">
                                    <img src={recipe.image} alt="" />
                                </div>
                                <h5>{recipe.title}</h5>
                            </div>
                        </Link>)
                })}
                {/* <button className="next" onClick={}>
                    next
                </button> */}
            </section>
        );
    }
};