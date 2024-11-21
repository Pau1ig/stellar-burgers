import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getBurgerConstructor,
  resetBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import { getUserData } from '../../services/slices/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import {
  getOrder,
  getOrderLoading,
  orderBurger,
  resetOrder
} from '../../services/slices/orderPostSlice';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getBurgerConstructor);
  const user = useSelector(getUserData);
  const orderModalData = useSelector(getOrder);
  const orderRequest = useSelector(getOrderLoading);

  const calculatePrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (total: number, ingredient: TConstructorIngredient) =>
          total + ingredient.price,
        0
      ),
    [constructorItems]
  );

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(orderData));
  };

  const handleCloseOrderModal = () => {
    dispatch(resetBurgerConstructor());
    dispatch(resetOrder());
  };

  return (
    <BurgerConstructorUI
      price={calculatePrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
