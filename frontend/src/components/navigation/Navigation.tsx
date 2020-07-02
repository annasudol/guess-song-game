import './Navigation.css';
import { AppRoutes } from '../../config';
import { ButtonLogout, Image } from '../../components';
import { getUserInfo } from '../../state/user/selectors';
import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent, ReactElement } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { clearSearch } from '../../state/search/actions';

export const Navigation: FunctionComponent = (): ReactElement => {
  const user = useSelector(getUserInfo);
  const dispatch = useDispatch();

  function clear(): void {
    dispatch(clearSearch());
  }
  return (
    <div className="nav bg-pink-900">
      <div className="container flex justify-between relative">
        <NavLink to={AppRoutes.Playlists} onClick={clear}>
          <Image src={require('../../assets/images/svg/logo.svg')} alt="logo" size="small" className="mt-2" />
        </NavLink>

        <div className="flex justify-between h-full w-60 mr-4">
          <span className="font-alba text-light-gray self-center text-sm md:text-lg pt-4 pr-2">hello {user.name}!</span>
          <Link to={AppRoutes.Scores} className="font-alba text-orange-500 self-center text-sm md:text-lg pt-4 pr-2">
            your scores
          </Link>
          <ButtonLogout imgSrc={user.image} />
        </div>
      </div>
    </div>
  );
};
