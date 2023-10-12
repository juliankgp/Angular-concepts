import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] AddIngredient';
export const ADD_INGREDIENTS = '[ShoppingList] AddIngredients';
export const UPDATE_INGREDIENTS = '[ShoppingList] UpdateIngredients';
export const DELETE_INGREDIENTS = '[ShoppingList] DeleteIngredients';
export const START_EDIT = '[ShoppingList] StarEdit';
export const END_EDIT = '[ShoppingList] EndEdit';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ payload: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ payload: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENTS,
  props<{ payload: Ingredient }>()
);

export const deleteIngredient = createAction(DELETE_INGREDIENTS);

export const starEdit = createAction(START_EDIT, props<{ payload: number }>());

export const endEdit = createAction(END_EDIT);

// export class IncrementAction implements Action {
//   readonly type = INCREMENT;

//   constructor(public value: number) {}
// }
