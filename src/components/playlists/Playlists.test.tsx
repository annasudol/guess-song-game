import * as redux from 'react-redux';
import { ErrorMessage, Playlists } from '../../components';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import toJson from 'enzyme-to-json';
jest.mock('react-redux');

const playlistProp = {
  '37i9dQZF1DXc3KygMa1OE7': {
    name: '80s Love Songs',
    image: 'https://pl.scdn.co/images/pl/default/0feef15b6deb4d264d55bd916bf7cacf8bc26dcc',
    tracks: [
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/9f4d173dc3f7b4e1d090dae27882a66d7f638fdb?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Chicago',
        externalUrl: 'https://open.spotify.com/track/7boKWlaNVmrhJdX8IbzUdD',
        title: "Hard to Say I'm Sorry - 2007 Remaster",
        img: 'https://i.scdn.co/image/ab67616d0000485136dfd7ab3a0b4f39908c2a04',
      },
    ],
  },
  '37i9dQZF1DXc3KygWa1OE7': {
    name: 'Dance Classics',
    image: 'https://i.scdn.co/image/ab67706f00000002377cd62f388e2de7c3b2b08c',
    tracks: [
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/90f925424294d179199cac8cd35228061e2c5fdc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Stardust',
        externalUrl: 'https://open.spotify.com/track/1mv4lh1rW1K6xhxhJmEezy',
        title: 'Music Sounds Better With You - Radio Edit',
        img: 'https://i.scdn.co/image/ab67616d00004851b98afa12c212cbbda4f1799b',
      },
    ],
  },
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
  useSelector: jest.fn(),
}));

describe('component', (): void => {
  describe('Playlists', (): void => {
    it('match snapshot when state return loading state', (): void => {
      const spy = jest.spyOn(redux, 'useSelector');

      spy.mockReturnValue({ loading: true });
      const wrapper = shallow(<Playlists />);

      expect(wrapper.containsMatchingElement(<CircularProgress />)).toEqual(true);
    });

    it('match snapshot when state returns playlist', (): void => {
      const spy = jest.spyOn(redux, 'useSelector');

      spy.mockReturnValue({ playListData: playlistProp });
      const wrapper = shallow(<Playlists />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders error message component when state returns error', (): void => {
      const spy = jest.spyOn(redux, 'useSelector');

      spy.mockReturnValue({ isError: true });
      const playlist = shallow(<Playlists />);

      expect(playlist.containsMatchingElement(<ErrorMessage message="ups..., Error, something went wrong" />)).toEqual(
        true,
      );
    });
  });
});
