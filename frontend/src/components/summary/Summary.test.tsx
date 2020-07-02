/* eslint-disable @typescript-eslint/no-var-requires */
import { shallow } from 'enzyme';
import React from 'react';
import * as redux from 'react-redux';
import { Summary, ListSongs } from '../../components';
jest.mock('react-router');
jest.mock('react-router');
const playlistID = '37i9dQZF1DXc3KygMa1OE7';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../hooks');
const useHttpClient = require('../../hooks').useHttpClient as jest.Mock;

describe('component', (): void => {
  describe('Summary', (): void => {
    beforeEach(() => {
      useHttpClient.mockReturnValue({
        sendRequest: jest.fn(),
      });
    });
    it('renders ListSongs component', () => {
      const spy = jest.spyOn(redux, 'useSelector');
      spy.mockReturnValue(playlistID);
      const wrapper = shallow(<Summary />);
      expect(wrapper.contains(<ListSongs />)).toBe(true);
    });
    it('displays info with points', () => {
      const spy = jest.spyOn(redux, 'useSelector');
      spy.mockReturnValue(30);
      const wrapper = shallow(<Summary />);
      expect(wrapper.find('.summary_score').text()).toBe('30');
    });
    it('renders Link with correct path', () => {
      const spy = jest.spyOn(redux, 'useSelector');
      spy.mockReturnValue(playlistID);
      const wrapper = shallow(<Summary />);
      expect(wrapper.find('Link').prop('to')['pathname']).toBe(`/game/${playlistID}`);
    });
  });
});
