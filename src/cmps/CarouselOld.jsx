import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "blue" }}
        onClick={onClick}
      />
    );
  }

export default class Carousel extends Component {
    render() {
        const {recipes} = this.props
        var settings = {
            // focusOnSelect:true, doesnt help
            slide:'a',
            accessibility: true,
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <Arrow />,
            prevArrow: <Arrow />,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        return (
            <Slider {...settings}>
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
            </Slider>
        );
    }
}