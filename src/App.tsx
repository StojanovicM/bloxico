/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import './App.scss'
import { useDebounce } from './debounce.component'
import { Paginator } from './paginator.component'
import { Recipe } from './recipe.component'
 
const App: React.FC = () => {

  const [state, setState]: [IState, any] = useState<IState>({
    currentPage: 1,
    recipes: [],
    totalPages: 0,
    filter: ''
  });


  const debouncedFilterTerm = useDebounce(state.filter, 500)


  useEffect(() => {
    loadRecipes(state.currentPage)
  },[debouncedFilterTerm, state.currentPage])
  

  const loadRecipes = async (page: number) => {
    let query = `?page=${page}`
    if (state.filter) query += `&search=${state.filter}`

    await fetch(`http://localhost:8081/recipes${query}`)
    .then(response => response.json())
    .then(payload => setState({...state, ...payload}))
  }


  const deleteRecipe = async (id: number) => {
    await fetch(`http://localhost:8081/recipes/${id}`, { method: 'DELETE'})
    .then(response => response.json)
    .then(() => {
      if (state.recipes.length === 1 && state.totalPages > 1) {
        setState({...state, currentPage: state.currentPage - 1})
      }
      else {
        loadRecipes(state.currentPage)
      }
    })
  }

  

  return (
    <Fragment>
      <h1>Recipes overview</h1>
      <input
        onKeyUp={ e => setState({ ...state, filter: e.currentTarget.value, currentPage: 1 }) }
        className="filter-input"
        placeholder='Filter' />
      <div>
        {
          state.recipes.length ? 
          state.recipes.map((recipe, i) => 
            <Recipe
              key={i}
              deleteRecipe={(id: number) => deleteRecipe(id) }
              recipe={recipe} />
          ) :
          'No Recipes found'
        }
      </div>
      <Paginator
        total={state.totalPages}
        current={state.currentPage}
        updatePage={(p: number) => setState({...state, currentPage: p}) }/>
    </Fragment>
  )
}


export default App;


interface IState {
  currentPage: number;
  recipes: IRecipe[];
  totalPages: number;
  filter: string;
}

export interface IRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit?: string
  }[]
  created: Date;
  modified: Date;
}
