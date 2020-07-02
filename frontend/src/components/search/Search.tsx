import './Search.css';
import { clearPlaylist } from '../../state/playList/actions';
import { clearSearch, searchPlayList } from '../../state/search/actions';
import { getToken } from '../../state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, SyntheticEvent, useEffect, useState } from 'react';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const Search: FunctionComponent = (): ReactElement => {
  const [query, setQuery] = useState<{ text: string }>({ text: '' });
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  function handleChange(event: InputEvent): void {
    setQuery({ text: event.target.value });
  }

  function handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    if (query.text.length > 3) {
      dispatch(searchPlayList(token, query.text));
    }
  }

  useEffect((): void => {
    if (query.text.length === 0) {
      dispatch(clearPlaylist());
      dispatch(clearSearch());
    }
  }, [query.text]);

  return (
    <div className="search ml-1 mr-1 md:flex justify-between items-center">
      <h1 className="font-albaSuper text-center text-orange-500 text-2xl md:text-3xl pb-2 md: pt-2">
        let&apos;s choose the playlist
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="text-sm md:text-xl"
          value={query.text}
          placeholder="Search for playlist"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
