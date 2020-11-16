import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Filter extends Component {
    state = {
        diet: null,
        type: null,
        intolerances: []
    }

    componentDidMount() {
        this.checkState()
    }

    componentDidUpdate() {
        // console.log('filter cmp updated', this.props.currFilter);
        var { currFilter } = this.props
        var { diet, type, intolerances } = this.state
        var flag = false
        if (intolerances[0] && currFilter.intolerances[0]) {
            intolerances.forEach(intolerance => {
                //if intolarence array is not the same flag is true
                if (!currFilter.intolerances.includes(intolerance)) {
                    flag = true
                }
            })
        }
        if (intolerances[0] && !currFilter.intolerances[0] || !intolerances[0] && currFilter.intolerances[0]) {
            flag = true
        }
        if (flag || currFilter.diet !== diet || currFilter.type !== type) {
            this.checkState()
        }
    }

    checkState = () => {
        var { currFilter } = this.props
        this.setState({ ...currFilter }, () => {
            console.log('filter cmp mounted ', this.state);
        })
    }

    handleSelect = (ev) => {
        const category = ev.target.name
        const value = ev.target.value
        console.log('handle select ', category, value);
        if (category === 'intolerances') {
            this.setState(prevState => ({ [category]: [...prevState[category], value] }),
                () => { this.props.handleChange(category, value) });
        } else {
            this.setState(({ [category]: value }), () => {
                this.props.handleChange(category, value)
            })
        }
    }

    render() {
        const diets = ['vegan', 'vegetarian', 'paleo']
        const types = ['main course', 'side dish', 'dessert', 'appetizer']
        const intolerances = ['dairy', 'egg', 'peanut', 'gluten']
        const { currFilter } = this.props
        console.log('filter cmp state ', this.state);
        return (
            <section className={"filter "}>
                {this.props.mobile && <button className="close-btn" onClick={() => { this.props.showFilter(false) }}>&times;</button>}
                <form>
                    <div>
                        {
                            diets.map((diet, idx) => {
                                return (<label key={diet + idx}>
                                    <input type="checkbox"
                                        checked={(currFilter.diet === diet)}
                                        disabled={currFilter.diet && (currFilter.diet !== diet)}
                                        onChange={(ev) => this.handleSelect(ev)}
                                        id={diet + idx}
                                        name="diet"
                                        value={diet} />
                                    <span>{diet}</span>
                                </label>)
                            })
                        }
                    </div>
                    <div>
                        {
                            types.map((type, idx) => {
                                return (<label key={type + idx}>
                                    <input type="checkbox"
                                        checked={(this.state.type === type)}
                                        disabled={this.state.type && (this.state.type !== type)}
                                        onChange={(ev) => this.handleSelect(ev)}
                                        name="type"
                                        value={type} />
                                    <span>{type}</span>
                                </label>)
                            })
                        }
                    </div>
                    <div>
                        {
                            intolerances.map((intolerance, idx) => {
                                return (<label key={intolerance + idx}>
                                    <input type="checkbox"
                                        checked={(currFilter.intolerances[0] && currFilter.intolerances.includes(intolerance))}
                                        onChange={(ev) => this.handleSelect(ev)}
                                        name="intolerances"
                                        value={intolerance} />
                                    <span>{intolerance} free</span>
                                </label>)
                            })
                        }
                    </div>
                </form>
            </section>
        )
    }
}

export default withRouter(Filter);