import './Button.css';
import { AppRoutes } from '../../config/routes';
import { Image } from '../../components';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../state/user/actions';
import { useDispatch } from 'react-redux';
import React, { FunctionComponent } from 'react';
import hash from '../../config/hash';

export interface ButtonLogoutProps {
  imgSrc?: string;
}

export const ButtonLogout: FunctionComponent<ButtonLogoutProps> = ({ imgSrc }) => {
  const dispatch = useDispatch();

  function logout(): void {
    dispatch(logoutUser());
    hash['access_token'] = null;
  }

  return (
    <Link className="logout" onClick={(): void => logout()} to={AppRoutes.Login}>
      <Image
        src={imgSrc ? imgSrc : require('../../assets/images/png/user_no_photo_600x600.png')}
        alt="logo"
        size="small"
        rounded="full"
      />
    </Link>
  );
};
