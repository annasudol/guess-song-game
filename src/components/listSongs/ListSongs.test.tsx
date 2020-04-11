import { shallow } from 'enzyme';
import React from 'react';
import * as redux from 'react-redux';
import toJson from 'enzyme-to-json';
import { ListSongs } from '../../components';
jest.mock('react-redux');
const tracks = [
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
];

describe('component', (): void => {
  describe('ListSongs', (): void => {
    beforeEach(() => {
      jest.spyOn(redux, 'useSelector').mockReturnValue(tracks);
    });
    it('match snapshot', (): void => {
      const listSongs = shallow(<ListSongs />);
      expect(toJson(listSongs.dive())).toMatchSnapshot();
    });
    it('renders links with proper external spotify url', (): void => {
      const listSongs = shallow(<ListSongs />);
      listSongs.find('a').map((item, index) => {
        expect(item.prop('href')).toBe(tracks[index].externalUrl);
      });
    });
    it("renders properly artist's names", (): void => {
      const listSongs = shallow(<ListSongs />);
      listSongs.find('h4').map((item, index) => {
        expect(item.prop('href')).toBe(tracks[index].artist);
      });
    });
    it("renders properly song's titles", (): void => {
      const listSongs = shallow(<ListSongs />);
      listSongs.find('h5').map((item, index) => {
        expect(item.prop('href')).toBe(tracks[index].title);
      });
    });
  });
});
