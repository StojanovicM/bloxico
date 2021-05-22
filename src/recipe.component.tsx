import { IRecipe } from './App'

export const Recipe: React.FC<IProps> = ({ recipe, deleteRecipe }) => {

  // Ask user to confirm deleting recipe
  const handleDelete = (): void => {
    const proceed = window.confirm('Are you sure you want to delete the recipe?')
    proceed && deleteRecipe(+recipe.id)
  }

  return (
    <div className="recipe-wrapper">
      <section>
        <h6>{recipe.title}</h6>
        <p>{recipe.description}</p>
      </section>
      <button onClick={ () => handleDelete() }>Delete</button>
    </div>
  )
}

interface IProps {
  recipe: IRecipe;
  deleteRecipe: (id:number) => void;
}