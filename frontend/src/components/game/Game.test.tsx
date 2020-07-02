/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallow, mount, ShallowWrapper, HTMLAttributes } from 'enzyme';
import React, { Component } from 'react';
import { Game, Timer, PointsInfo, Summary } from '../../components';
import * as redux from 'react-redux';
import * as router from 'react-router';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('../../hooks');
const useTimer = require('../../hooks').useTimer as jest.Mock;
const useReducerGame = require('../../hooks').useReducerGame as jest.Mock;

const location = {
  pathname: 'game/37i9dQZF1DXc3KygMa1OE7',
  state: {
    songs: [
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/9f4d173dc3f7b4e1d090dae27882a66d7f638fdb?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Chicago',
        externalUrl: 'https://open.spotify.com/track/7boKWlaNVmrhJdX8IbzUdD',
        title: "Hard to Say I'm Sorry - 2007 Remaster",
        img: 'https://i.scdn.co/image/ab67616d0000485136dfd7ab3a0b4f39908c2a04',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/90f925424294d179199cac8cd35228061e2c5fdc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Stardust',
        externalUrl: 'https://open.spotify.com/track/1mv4lh1rW1K6xhxhJmEezy',
        title: 'Music Sounds Better With You - Radio Edit',
        img: 'https://i.scdn.co/image/ab67616d00004851b98afa12c212cbbda4f1799b',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/632c725bcccc5c62c5c7beb1308c3f31a6882441?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/2lmcH6prYo3BlR8LfRUJc3',
        title: 'All Out of Love',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/1ab9395522d9f7b17e0be6a905238a829398c022?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Ambrosia',
        externalUrl: 'https://open.spotify.com/track/6JHXiRD1QjMK1N6AQEnL04',
        title: 'Biggest Part of Me',
        img: 'https://i.scdn.co/image/ab67616d000048510736c6f7e55f0bbe4b5f8497',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/8e181e607357a766ec91e2610de68b0781272c20?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Cars',
        externalUrl: 'https://open.spotify.com/track/2lFFiNm0XtgJ6wkdncTB4k',
        title: 'Drive',
        img: 'https://i.scdn.co/image/ab67616d00004851f607580794ed5b352884fd47',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/99b64d88654571992e729870849b5b84a97681b7?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/01MXkFA8sL7at6txavDErt',
        title: 'Making Love Out of Nothing at All',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/147687c4809b45a494ad502bf79a2903ebe2534a?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Tracy Chapman',
        externalUrl: 'https://open.spotify.com/track/2DjWsDGgL1xNbhnr7f6t5F',
        title: 'Baby Can I Hold You',
        img: 'https://i.scdn.co/image/ab67616d000048517602becfedf6e25752cb54ff',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36c',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Bangles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCi',
        title: 'Eternal Flame',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Beatles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCj',
        title: 'I feel fine',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36z',
      },
    ],
    tracks: [
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/9f4d173dc3f7b4e1d090dae27882a66d7f638fdb?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Chicago',
        externalUrl: 'https://open.spotify.com/track/7boKWlaNVmrhJdX8IbzUdD',
        title: "Hard to Say I'm Sorry - 2007 Remaster",
        img: 'https://i.scdn.co/image/ab67616d0000485136dfd7ab3a0b4f39908c2a04',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/90f925424294d179199cac8cd35228061e2c5fdc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Stardust',
        externalUrl: 'https://open.spotify.com/track/1mv4lh1rW1K6xhxhJmEezy',
        title: 'Music Sounds Better With You - Radio Edit',
        img: 'https://i.scdn.co/image/ab67616d00004851b98afa12c212cbbda4f1799b',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/632c725bcccc5c62c5c7beb1308c3f31a6882441?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/2lmcH6prYo3BlR8LfRUJc3',
        title: 'All Out of Love',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/1ab9395522d9f7b17e0be6a905238a829398c022?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Ambrosia',
        externalUrl: 'https://open.spotify.com/track/6JHXiRD1QjMK1N6AQEnL04',
        title: 'Biggest Part of Me',
        img: 'https://i.scdn.co/image/ab67616d000048510736c6f7e55f0bbe4b5f8497',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/8e181e607357a766ec91e2610de68b0781272c20?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Cars',
        externalUrl: 'https://open.spotify.com/track/2lFFiNm0XtgJ6wkdncTB4k',
        title: 'Drive',
        img: 'https://i.scdn.co/image/ab67616d00004851f607580794ed5b352884fd47',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/99b64d88654571992e729870849b5b84a97681b7?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/01MXkFA8sL7at6txavDErt',
        title: 'Making Love Out of Nothing at All',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/147687c4809b45a494ad502bf79a2903ebe2534a?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Tracy Chapman',
        externalUrl: 'https://open.spotify.com/track/2DjWsDGgL1xNbhnr7f6t5F',
        title: 'Baby Can I Hold You',
        img: 'https://i.scdn.co/image/ab67616d000048517602becfedf6e25752cb54ff',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36c',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Bangles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCi',
        title: 'Eternal Flame',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Beatles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCj',
        title: 'I feel fine',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36z',
      },
    ],
  },
  search: '',
  hash: '',
  key: 'upph5v',
};
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
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/90f925424294d179199cac8cd35228061e2c5fdc?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Stardust',
        externalUrl: 'https://open.spotify.com/track/1mv4lh1rW1K6xhxhJmEezy',
        title: 'Music Sounds Better With You - Radio Edit',
        img: 'https://i.scdn.co/image/ab67616d00004851b98afa12c212cbbda4f1799b',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/632c725bcccc5c62c5c7beb1308c3f31a6882441?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/2lmcH6prYo3BlR8LfRUJc3',
        title: 'All Out of Love',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/1ab9395522d9f7b17e0be6a905238a829398c022?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Ambrosia',
        externalUrl: 'https://open.spotify.com/track/6JHXiRD1QjMK1N6AQEnL04',
        title: 'Biggest Part of Me',
        img: 'https://i.scdn.co/image/ab67616d000048510736c6f7e55f0bbe4b5f8497',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/8e181e607357a766ec91e2610de68b0781272c20?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Cars',
        externalUrl: 'https://open.spotify.com/track/2lFFiNm0XtgJ6wkdncTB4k',
        title: 'Drive',
        img: 'https://i.scdn.co/image/ab67616d00004851f607580794ed5b352884fd47',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/99b64d88654571992e729870849b5b84a97681b7?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Air Supply',
        externalUrl: 'https://open.spotify.com/track/01MXkFA8sL7at6txavDErt',
        title: 'Making Love Out of Nothing at All',
        img: 'https://i.scdn.co/image/ab67616d000048513a9106f940fb04bc98a2b95e',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/147687c4809b45a494ad502bf79a2903ebe2534a?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Tracy Chapman',
        externalUrl: 'https://open.spotify.com/track/2DjWsDGgL1xNbhnr7f6t5F',
        title: 'Baby Can I Hold You',
        img: 'https://i.scdn.co/image/ab67616d000048517602becfedf6e25752cb54ff',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36c',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Bangles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCi',
        title: 'Eternal Flame',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c558bc461278efa0159e732a1eb8e314ed1758f9?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'The Beatles',
        externalUrl: 'https://open.spotify.com/track/5MoDQWMDMaAGDEiWsJfeCj',
        title: 'I feel fine',
        img: 'https://i.scdn.co/image/ab67616d00004851fed4a89ebe66064c67f2f4ea',
      },
      {
        songUrl:
          'https://p.scdn.co/mp3-preview/c6d882be38960697c7db8cbc4084dd7d1e1612cf?cid=9e408fab4a8c4d6096b013b572a8ab1f',
        artist: 'Debbie Gibson',
        externalUrl: 'https://open.spotify.com/track/6PMDILZiYo4YzMBbE0dGK9',
        title: 'Lost in Your Eyes',
        img: 'https://i.scdn.co/image/ab67616d000048514d39b800867da3bf4f6cc36z',
      },
    ],
  },
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
}));

jest.mock('react-router', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

const playlistID = '37i9dQZF1DXc3KygMa1OE7';
const songIndex = 0;
describe('component', (): void => {
  describe('game', (): void => {
    beforeEach(() => {
      jest.spyOn(router, 'useLocation').mockReturnValue({ ...location });
      jest.spyOn(router, 'useParams').mockReturnValue({ playlistID });
      jest.spyOn(redux, 'useSelector').mockReturnValue(playlistProp);
      // dispatchToState.mockReturnValue({ playlistId: "", points: 0, tracks: [] });
    });
    describe('contains', (): void => {
      beforeEach(() => {
        useTimer.mockReturnValue({
          elapsedTime: 0,
          startTimer: jest.fn(),
          resetTimer: jest.fn(),
        });
        useReducerGame.mockReturnValue({
          songIndex,
          end: false,
          totalScore: 0,
          dispatch: jest.fn(),
        });
      });

      it('timer component', (): void => {
        const wrapper = shallow(<Game />);
        expect(wrapper.containsMatchingElement(<Timer time={0} />)).toEqual(true);
      });

      it('score info component', (): void => {
        const wrapper = shallow(<Game />);
        expect(wrapper.containsMatchingElement(<PointsInfo songNr={1} totalScore={0} />)).toEqual(true);
      });

      it('react player with correct url', (): void => {
        const wrapper = shallow(<Game />);
        const playerUrl = wrapper.find('ReactPlayer').prop('url');
        expect(playerUrl).toBe(location.state.songs[songIndex].songUrl);
      });

      it('one button with correct answer and nine with incorrect answers', (): void => {
        const wrapper = shallow(<Game />);
        const results = wrapper.find('Button').map(btn => btn.prop('value')[0] === btn.prop('value')[1]);

        expect(results.filter(item => item === true)).toHaveLength(1);
        expect(results.filter(item => item == false)).toHaveLength(9);
      });
    });
    describe('testing dispatch with correct values', (): void => {
      it('upon clicking bad answer', () => {
        const wrapper = shallow(<Game />);

        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);
        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index + 1)
          .simulate('click');
        wrapper.update();

        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: -10,
        });
      });
      it('upon clicking good answer when song index is below 9', () => {
        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);
        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();

        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: 30,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
      it('upon clicking good answer when song index is 9', () => {
        useReducerGame.mockReturnValue({
          songIndex: 9,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 0,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);

        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'END_GAME',
        });
      });
      it('upon clicking good answer when timeElapsed in below 5', () => {
        useReducerGame.mockReturnValue({
          songIndex: 1,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 0,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);

        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: 30,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
      it('upon clicking good answer when timeElapsed in below 10 and higher than 5', () => {
        useReducerGame.mockReturnValue({
          songIndex: 2,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 8,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);

        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: 20,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
      it('upon clicking good answer when timeElapsed in below 15 and higher than 10', () => {
        useReducerGame.mockReturnValue({
          songIndex: 1,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 11,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);

        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: 10,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
      it('upon clicking good answer when timeElapsed in higher than 20', () => {
        useReducerGame.mockReturnValue({
          songIndex: 1,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 21,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = shallow(<Game />);
        const results = wrapper
          .find('Button')
          .map(
            (btn: ShallowWrapper<HTMLAttributes, any, Component<{}, {}, any>>) =>
              btn.prop('value')[0] === btn.prop('value')[1],
          );
        const index = results.findIndex((item: boolean) => item === true);

        const { result } = renderHook(() => useReducerGame());

        wrapper
          .find('Button')
          .at(index)
          .simulate('click');
        wrapper.update();
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: 5,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
      it('when elapseTime is 30 and songIndex equal 9 ', () => {
        jest.spyOn(router, 'useParams').mockReturnValue({ playlistID });
        jest.spyOn(redux, 'useSelector').mockReturnValue(playlistProp);
        useReducerGame.mockReturnValue({
          songIndex: 9,
          end: false,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 30,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const wrapper = mount(<Game />);
        const { result } = renderHook(() => useReducerGame());

        wrapper.update();

        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'END_GAME',
        });
      });
      it('when elapseTime is 30 and songIndex less than 10', () => {
        jest.spyOn(router, 'useParams').mockReturnValue({ playlistID });
        jest.spyOn(redux, 'useSelector').mockReturnValue(playlistProp);
        useReducerGame.mockReturnValue({
          songIndex: 5,
          end: false,
          totalScore: 0,
          dispatch: jest.fn(),
        });
        useTimer.mockReturnValue({
          elapsedTime: 30,
          startTimer: jest.fn(),
          endTimer: jest.fn(),
          resetTimer: jest.fn(),
        });

        const playlist = mount(<Game />);
        const { result } = renderHook(() => useReducerGame());

        playlist.update();

        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'CHANGE_POINTS',
          setPoints: -10,
        });
        expect(result.current.dispatch).toHaveBeenCalledWith({
          TYPE: 'INCREASE_INDEX',
        });
      });
    });
  });
});
