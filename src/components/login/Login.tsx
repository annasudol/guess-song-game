import { AppRoutes } from '../../config';
import { Button, Image } from '../../components';
import { fetchUser } from '../../state/user/actions';
import { useDispatch } from 'react-redux';
import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import hash from '../../config/hash';

export const Login: FunctionComponent = (): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    const _token: string = hash['access_token'];

    dispatch(fetchUser(_token));
  }, [dispatch]);

  return (
    <div className="bg-indigo-900 h-screen w-screen flex justify-center pt-2">
      <div className="flex flex-col justify-center">
        <h1 className="font-albaSuper text-center text-orange-500 text-5xl pb-4">
          guess the <br />
          so<span>ng</span> game
        </h1>
        <Image src={require('../../assets/images/svg/dj-mixer.svg')} alt="vinyl player" size="large" />
        <Button href={{ path: AppRoutes.Authorize }} spacing={{ mt: '10' }}>
          login to spotify
        </Button>
      </div>
    </div>
  );
};
