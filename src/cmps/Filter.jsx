import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Filter extends Component {
    state = {
        diet: null,
        type: null,
        intolerances: null
    }

    handleChange = (ev) => {
        const category = ev.target.name
        const value =  ev.target.value
        this.setState( ({ [category]:value}), () => {
            this.props.onSetFilter(this.state)
        })
    }


    // componentDidMount() {
    //     this.readURL()
    // }

    readURL = () => {
        var url = this.props.location.search.substring(3)
        var strMap = {}
        //organize url into object
        var parts = url.split('&')
        parts.forEach(part => {
            part = part.split('=')
            var category = part[0]
            var value = part[1]
            if (category === 'intolerances') {
                if (strMap.intolerances) {
                    strMap.intolerances.push(value)
                }else{
                        value=value.split(',')
                        strMap.intolerances = value
                } 
            }else{
                strMap[category] = value
            }
        })

        //set current state
        this.setState({...strMap})
    }

    // handleChange = (ev) => {
        // var { category, value } = ev.target;
        // this.changeState(category, value)
        // var newURL = this.getNewURL(category, value)

        // history.push({
        //     search: `${newURL}`
        // })
    // }

    changeState = (category, value) => {
        if (category === 'intolerances') {
            var intolerances = this.state.intolerances
            var idx = intolerances.findIndex(intolerance => intolerance === value)
            if (idx === -1) {
                intolerances.push(value)
            } else {
                intolerances.splice(idx, 1)
            }
            this.setState({ intolerances })
        } else {
            if (this.state[category] === value) {
                value = ''
            }
            this.setState({ [category]: value })
        }
    }

    getNewURL = (newCategory, newValue) => {
        var str = this.props.location.search.substring(3)
        console.log('curr url', str);
        var strMap = {}
        var newStr = ''
        //dismember
        var parts = str.split('&')
        parts.forEach(part => {
            part = part.split('=')
            var category = part[0]
            var value = part[1]
            if (strMap[category]) {

            }
            strMap[category] = value
            if (!strMap[newCategory]) {
                strMap[newCategory] = [newValue]
            }
            if (strMap[newCategory]) {
                var idx = strMap[newCategory].findIndex(category => category === newValue)
                if (idx === -1) {//not found - add
                    strMap[newCategory].push(newValue)
                } else {//found- remove
                    strMap[newCategory] = strMap[newCategory].splice(idx, 1)
                }
            }
        });
        //join&return
        for (const cat in strMap) {
            newStr = newStr + '&' + cat + '=' + strMap[cat].join(',')
        }
        console.log('after change state', this.state);
        console.log('after change url', str);
        return newStr.substring(1)
    }

    render() {
        const diets = ['Vegan', 'Vegetarian', 'Paleo']
        const types = ['Main Course', 'Side Dish', 'Dessert', 'Appetizer']
        const intolerances = ['Dairy', 'Egg', 'Peanut', 'Gluten']
        console.log('the state ',this.state)
        return (
            <section className={"filter "}>
                {this.props.mobile && <button className="close-btn" onClick={() => { this.props.showFilter(false) }}>&times;</button>}
                <form>
                    <div>
                        {
                            diets.map((diet, idx) => {
                                return (<label key={diet + idx}>
                                    <input type="checkbox"
                                        checked={(this.state.diet===diet)}
                                        disabled={this.state.diet&&(this.state.diet!==diet)}
                                        onChange={this.handleChange}
                                        id={diet + idx} category="diet"
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
                                        // checked={}
                                        // disabled={!type.isChecked}
                                        onChange={this.handleChange}
                                        category="type"
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
                                        // disabled={false}
                                        // checked={intolerance}
                                        onChange={this.handleChange}
                                        category="intolerances"
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