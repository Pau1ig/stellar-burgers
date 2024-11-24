import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserData } from '../../services/slices/userAuthSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserData);
  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
