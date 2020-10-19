import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom';


class Header extends Component {
    state = {
        searchValue: '',
        // isSideBarShown: null,
        sideBarClass: '',
        classes: {
            diet: '',
            type: ''
        }
    }

    toggleSideBar = () => {
        let newClass = ''
        if (window.innerWidth <= 880 && !this.state.sideBarClass) newClass = 'shown'
        this.setState({ sideBarClass: newClass })
    }

    toggleSearch = (category) => {
        // console.log('b4 toggle',this.state);
        for (const categoryName in this.state.classes) {
            // console.log('for in loop ',categoryName);
            if (category !== categoryName) {  //the rest should be: ''
                // this.setState({ classes: { [categoryName]: '' } })
                this.setState(prevState => ({ classes: {...prevState.classes,[categoryName]:'' } }));
            }else{ 
                var showClass = (this.state.classes[category]) ? '' : 'shown'
                // this.setState({ classes: { [category]: showClass } })
                this.setState(prevState => ({ classes: {...prevState.classes,[categoryName]:showClass } }));
            }
        }
        // console.log('after toggle',this.state);
    }

    handleChange = (ev) => {
        let { value } = ev.target
        this.setState({ searchValue: value })
    }

    handleSearch = (ev) => {
        ev.preventDefault()
        this.props.history.push({
            pathname: '/search',
            search: `?q=query=${this.state.searchValue}`
        })
    }

    render() {
        const menuSvg = <svg height="384pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><g fill="#FFFFFF"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /></g></svg>
        const closeSvg =
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 512.001 512.001" xml="preserve">
                <g fill="white">
                    <g>
                        <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                    L284.286,256.002z"/>
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

        const { sideBarClass } = this.state
        return (
            <header className="grid-container">
                <nav className="flex align-center ">
                    <Link to="/" exact='true' ><h1>Top Recipes</h1></Link>
                    <button className={"menu-btn " + sideBarClass} onClick={this.toggleSideBar}>
                        {menuSvg}
                    </button>
                    <button className={"close-btn " + sideBarClass} onClick={this.toggleSideBar}>
                        {closeSvg}
                    </button>
                    <section className={"nav-btns flex " + sideBarClass}>
                        <button className='diets-btn' onClick={() => this.toggleSearch('diet')} onMouseEnter={() => this.toggleSearch('diet')} >Special Diets</button>
                        <ul className={this.state.classes.diet + " diet-list"} onMouseLeave={() => this.toggleSearch('diet')} onClick={() => this.toggleSearch('diet')}>
                            <li><NavLink exact to="/search?q=diet=vegan">Vegan</NavLink></li>
                            <li><NavLink exact to="/search?q=diet=vegetarian">Vegetarian</NavLink></li>
                            <li><NavLink exact to="/search?q=diet=gluten free">Gluten Free</NavLink></li>
                        </ul>
                        <button className='types-btn' onClick={() => this.toggleSearch('type')} onMouseEnter={() => this.toggleSearch('type')}>Dish Type</button>
                        <ul className={this.state.classes.type + " dish-list"} onMouseLeave={() => this.toggleSearch('type')} onClick={() => this.toggleSearch('type')}>
                            <li><NavLink exact to="/search?q=type=appetizer">Appetizer</NavLink></li>
                            <li><NavLink exact to="/search?q=type=main course">Main</NavLink></li>
                            <li><NavLink exact to="/search?q=type=dessert">Dessert</NavLink></li>
                            <li><NavLink exact to="/search?q=type=breakfast">Breakfast</NavLink></li>
                        </ul>
                    </section>
                    <form onSubmit={this.handleSearch}>
                        <input type="text" onChange={this.handleChange} value={this.state.searchValue} />
                        <button className="">
                            <img alt="search" src={require("../imgs/search.png")} />
                        </button>
                    </form>
                </nav>
            </header >
        )
    }
}

export default withRouter(Header);


