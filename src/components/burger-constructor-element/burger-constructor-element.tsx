import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  handleMoveIngredient,
  removeIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const moveIngredientDown = () => {
      dispatch(handleMoveIngredient({ preIndex: index, newIndex: index + 1 }));
    };

    const moveIngredientUp = () => {
      dispatch(handleMoveIngredient({ preIndex: index, newIndex: index - 1 }));
    };

    const removeIngredientFromConstructor = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={moveIngredientUp}
        handleMoveDown={moveIngredientDown}
        handleClose={removeIngredientFromConstructor}
      />
    );
  }
);
