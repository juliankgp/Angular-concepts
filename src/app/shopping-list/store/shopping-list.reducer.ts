import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  endEdit,
  starEdit,
  updateIngredient,
} from './shopping-list.actions';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload],
    };
  }),
  on(addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload],
    };
  }),
  on(updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.payload,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ing, index) => {
        return index !== state.editedIngredientIndex;
      }),
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(starEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.payload,
      editedIngredient: { ...state.ingredients[action.payload] },
    };
  }),
  on(endEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);

// export function counterReducer(
//   state = initialState,
//   action: CounterActions | Action
// ) {

//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;

// }
