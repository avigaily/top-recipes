import { Link } from "react-router-dom";
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CarouselSlick(props) {
    const { recipes } = props;
    const next = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 443.52 443.52" xml="preserve">
    <g>
        <g>
            <path d="M336.226,209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132,0.42c-6.388,6.614-6.388,17.099,0,23.712l192.734,192.734
                L107.294,414.391c-6.663,6.664-6.663,17.468,0,24.132c6.665,6.663,17.468,6.663,24.132,0l204.8-204.8
                C342.889,227.058,342.889,216.255,336.226,209.591z"/>
        </g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    <g>
    </g>
    </svg>
    
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode:false,
        infinite: true,
        accessibility: true,
        focusOnChange:true,
        arrows:true,
        draggable:false,
        focusOnSelect:true,
        // prevArrow:<button type="button" className="slick-prev">{next}</button>,
        // nextArrow:<button type="button" className="slick-next">{next}</button>,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <Slider className="" {...settings}>
            {recipes.map((recipe, idx) => {
                return (
                    <Link key={idx} to={`/${recipe.id}`} >
                        <div key={recipe.id} className="flex column justify-center">
                            <div className="img-container">
                                <img src={recipe.image} alt="" />
                            </div>
                            <h5>{recipe.title}</h5>
                        </div>
                    </Link>
                )
            })}
        </Slider>
    )
}

