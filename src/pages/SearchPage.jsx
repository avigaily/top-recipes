import React, { Component } from 'react'
import recipeService from '../recipeService'
import { Link } from 'react-router-dom'
import Filter from '../cmps/Filter';
export default class SearchPage extends Component {
    state = {
        currFilter: {
            diet: '',
            type: '',
            intolerances: [],
            query: ''
        },
        currFilterStr: '',
        currRecipes: [],
        isShown: null,
        isMobile: null
    }

    componentDidMount() {
        this.checkFilter()
        this.checkIsMobile()
        window.addEventListener("resize", this.checkIsMobile);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.checkIsMobile)
    }

    componentDidUpdate() {
        this.checkFilter()
    }

    checkFilter = () => {
        if (this.state.currFilterStr !== this.props.location.search) {
            //update state-  str, currFilter
            this.setState({ currFilterStr: this.props.location.search }, () => { this.loadRecipes() })
            var str = this.props.location.search.substring(3)
            var parts = str.split('&')
            parts.forEach(part => {
                console.log('check filter got ', part);
                part = part.split('=')
                var category = part[0]
                var value = part[1]
                if (category === 'diet' || category === 'type' || category === 'query') {
                    console.log(category, value);
                    //set new type/diet
                    this.setState(prevState => ({ currFilter: { ...prevState.currFilter, [category]: value } }),
                        () => { console.log('state filter ', this.state.currFilter) })
                } else {
                    if (value.includes(',')) {
                        //some vals
                        this.setState(prevState => ({ currFilter: { ...prevState.currFilter, [category]: value.split(',') } }))
                    } else {
                        //one val 
                        this.setState({ currFilter: { ...this.state.currFilter, [category]: [value] } })
                    }
                }
            });
        }
    }

    handleChange = (category, value) => {
        console.log('handle change got ', category, value);
        //if null now
        if (category === 'intolerances') {
            value = [...this.state.currFilter.intolerances, value]
            this.setState(prevState => ({ currFilter: { ...prevState.currFilter, [category]: value } }),
                () => { this.changeUrl() })
        } else {
            this.setState({ currFilter: { ...this.state.currFilter, [category]: value } }, () => { this.changeUrl() })
        }
    }

    changeUrl = () => {
        var str = ''
        var { currFilter } = this.state
        console.log('got to change url', currFilter);
        for (var category in currFilter) {
            if (category === 'intolerances') {
                if (currFilter[category][0]) {
                    //if str is not empty
                    if (str) {
                        str = str + '&'
                    }
                    str = str + 'intolerances='
                    currFilter[category].forEach((value, idx) => {
                        //if it's not the last allergy add a ','
                        if (idx + 1 < currFilter[category].length) {
                            value = value + ','
                        }
                        str = str + value
                    })
                }
                //for diet & type
            } else if (currFilter[category]) {
                //if str is not empty
                if (str) {
                    str = str + '&'
                }
                str = str + category + '=' + currFilter[category]
            }
        }
        this.props.history.push({
            search: `?q=${str}`
        })
    }

    checkIsMobile = () => {
        var isMobile = (window.innerWidth <= 880) ? true : false
        this.setState({ isMobile })
    }

    loadRecipes = async () => {
        const recipes = await recipeService.query(this.state.currFilterStr)
        this.setState({ currRecipes: recipes })
    }

    showFilter = (isShown) => {
        this.setState({ isShown: isShown })
    }

    render() {
        const { isMobile, isShown } = this.state
        var filter = ''
        if (!isMobile || (isMobile && isShown)) {
            filter = <Filter isMobile={isMobile} showFilter={this.showFilter} location={this.props.location} currFilter={this.state.currFilter} handleChange={this.handleChange} />
        }
        return (!this.state.currRecipes) ? <p>Loading</p> : (
            <section className="grid-container">
                <section className="search-page-content flex">
                    {isMobile && !isShown && <button className="open-btn" onClick={() => this.showFilter(true)}>Filter</button>}
                    {/* {(!isMobile||(isMobile&&isShown)) && <Filter isMobile={isMobile} showFilter={this.showFilter} location={this.props.location} />} */}
                    {filter}
                    <section className="cards-container">
                        {this.state.currRecipes.map((recipe, idx) => {
                            return (
                                <Link key={idx} to={`/${recipe.id}`} >
                                    <div key={recipe.id} className="flex column justify-center">
                                        <div className="img-container">
                                            <img src={recipe.image} alt="recipe" />
                                        </div>
                                        <h5>{recipe.title}</h5>
                                    </div>
                                </Link>)
                        })}
                    </section>
                </section>
            </section>
        )
    }
}
