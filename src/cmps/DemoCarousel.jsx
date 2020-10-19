import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
 
export class DemoCarousel extends Component {
    render() {
        const {recipes} = this.props
        return (
            <Carousel>
               {recipes.map((recipe, idx) => {
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
            </Carousel>
        );
    }
};
 
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));
 