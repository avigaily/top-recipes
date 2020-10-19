import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import recipeService from '../recipeService'

export default class RecipeDetails extends Component {

    state = {
        recipe: null,
        diets: null
    }

    componentDidMount() {
        this.loadRecipe()
    }

    loadRecipe = async () => {
        var id = this.props.location.pathname.substring(1)
        var recipe = await recipeService.getById(id)
        console.log(recipe);
        if (recipe.instructions) {
            recipe.instructions = recipe.instructions.replace('.)', ')').trim()
            console.log('instructions', recipe.instructions);
            recipe.instructions = recipe.instructions.split(/\. ?/g)//todo: maybe add check for numbers here and not later
        }
        this.setState({ recipe: recipe, diets: recipe.diets.slice(0, 3) })

    }

    createMarkup = () => {
        var str = this.state.recipe.summary
        str = str.substring(0, str.indexOf('.') + 1)
        return { __html: str };
    }

    render() {
        const { recipe, diets } = this.state
        return !recipe ? 'loading' : (
            <section className="grid-container">
                <section className="recipe-details">
                    <section className="recipe-header">
                        <h5 className="title">{recipe.title}</h5>
                        {diets && <div className="diets">
                            {diets.map((diet, idx) => {
                                return <Link key={idx} exact to={`/search?q=diet=${diet}`}>&#35; {diet}</Link>
                            })}
                        </div>}
                        <div className="img-container">
                            <img src={recipe.image} alt="" />
                        </div>
                    </section>
                    <p className="summary" dangerouslySetInnerHTML={this.createMarkup()} />
                    <div className="short-info flex">
                        <p>
                            Prep time: <br />
                            {recipe.preparationMinutes}
                        </p>
                        <p>
                            Total time: <br />
                            {recipe.readyInMinutes}
                        </p>
                        <p>
                            Serves: <br />
                            {recipe.servings}
                        </p>
                    </div>
                    <section className="content flex">
                        <div className="ingredients">
                            <h6>Ingredients</h6>
                            {recipe.extendedIngredients.map((ingredient, idx) => {
                                return <p key={idx}>{ingredient.original}</p>
                            })}
                        </div>
                        <div>
                            <h6>Instructions</h6>
                            <div>
                                {recipe.instructions &&
                                    recipe.instructions.map((line) => {
                                        if (isNaN(parseInt(line.charAt(0))) && line !== ' ' && line) {
                                            var lastChar = ''
                                            if (line.charAt(line.length - 1) !== '!') {
                                                lastChar = '.'
                                            }
                                            return (<p>{line}{lastChar}</p>)
                                        }
                                    })

                                }
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}
