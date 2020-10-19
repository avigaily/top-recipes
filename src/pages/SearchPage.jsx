import React, { Component } from 'react'
import recipeService from '../recipeService'
import { Link } from 'react-router-dom'
import Filter from '../cmps/Filter';
export default class SearchPage extends Component {
    state = {
        currFilter: {},
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
            this.setState({ currFilterStr: this.props.location.search }, () => { this.loadRecipes() })
        }
    }

    onSetFilter=(newFilter)=>{
        this.setState({currFilter:newFilter})
        var str = ''
        for(var category in newFilter){
            str= str+'&'+category +'='+newFilter[category]
        }
        this.props.history.push(str)
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
        this.setState({ isShown:isShown })
    }

    render() {
        const { isMobile, isShown } = this.state
        var filter=''
        if (!isMobile||(isMobile&&isShown)){
            filter = <Filter isMobile={isMobile} showFilter={this.showFilter} location={this.props.location} currFilter={this.state.currFilter} onSetFilter={this.onSetFilter}/>
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
