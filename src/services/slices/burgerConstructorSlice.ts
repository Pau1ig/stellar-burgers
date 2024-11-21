import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients = [...state.ingredients, action.payload];
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients = state.ingredients.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    resetBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    handleMoveIngredient(state, action) {
      const { preIndex, newIndex } = action.payload;
      const updatedIngredients = [...state.ingredients];
      [updatedIngredients[preIndex], updatedIngredients[newIndex]] = [
        updatedIngredients[newIndex],
        updatedIngredients[preIndex]
      ];
      state.ingredients = updatedIngredients;
    }
  },
  selectors: {
    getBurgerConstructor(state) {
      return state;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetBurgerConstructor,
  handleMoveIngredient
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { getBurgerConstructor } = burgerConstructorSlice.selectors;
