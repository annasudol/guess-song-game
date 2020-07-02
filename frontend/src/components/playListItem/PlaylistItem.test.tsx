import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { PlaylistItem } from '../../components';
import { PlayListTypes } from '../../state/playList/types/index';

const playlist: PlayListTypes = {
  '37i9dQZF1DXbTxeAdrVG2l': {
    name: 'All Out 90s',
    image: 'https://i.scdn.co/image/ab67706f0000000261a2716ff11943f81ebd0e4f',
    tracks: [
      {
        songUrl: 'https://p.scdn.co/mp3-preview/d21',
        artist: 'Cher',
        externalUrl: 'https://open.spotify.com/track/60Pwcnt2y9ML9VP4gwrcxm',
        title: 'Walking in Memphis',
        img: 'https://i.scdn.co/image/ab67616d000048511cafae5c9e0e809317d46a31',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/8f9085faa29895e3eb68da902f2ba0d6ad180ddc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Take That',
        externalUrl: 'https://open.spotify.com/track/24fQpRwKFkC3Fe8QtvvrNw',
        title: 'Back for Good - Radio Mix',
        img: 'https://i.scdn.co/image/ab67616d000048514d30d662454d239ed12fe963',
      },
    ],
  },
};

const playlistWithoutImage: PlayListTypes = {
  '37i9dQZF1DXbTxeAdrVG2l': {
    name: 'All Out 90s',
    tracks: [
      {
        songUrl: 'https://p.scdn.co/mp3-preview/d21',
        artist: 'Cher',
        externalUrl: 'https://open.spotify.com/track/60Pwcnt2y9ML9VP4gwrcxm',
        title: 'Walking in Memphis',
        img: 'https://i.scdn.co/image/ab67616d000048511cafae5c9e0e809317d46a31',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/8f9085faa29895e3eb68da902f2ba0d6ad180ddc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Take That',
        externalUrl: 'https://open.spotify.com/track/24fQpRwKFkC3Fe8QtvvrNw',
        title: 'Back for Good - Radio Mix',
        img: 'https://i.scdn.co/image/ab67616d000048514d30d662454d239ed12fe963',
      },
    ],
  },
};

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
describe('component', (): void => {
  describe('PlaylistItem', (): void => {
    const playlistId = Object.keys(playlist)[0];
    it('match snapshot', (): void => {
      const warper = shallow(<PlaylistItem playlist={playlist} />);
      expect(toJson(warper)).toMatchSnapshot();
    });
    it('renders NavLink with correct path ', (): void => {
      const warper = shallow(<PlaylistItem playlist={playlist} />);
      expect(warper.find('NavLink').prop('to')['pathname']).toBe(`/game/${playlistId}`);
    });
    it('renders images with correct src prop', (): void => {
      const warper = shallow(<PlaylistItem playlist={playlist} />);
      expect(warper.find('Image').prop('src')).toBe(playlist[playlistId].image);
    });
    it('renders default image when given playlist with now image', (): void => {
      const warper = shallow(<PlaylistItem playlist={playlistWithoutImage} />);
      expect(warper.find('Image').prop('src')).toBe('noimage.png');
    });
  });
});
