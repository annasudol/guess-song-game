import { shallow } from 'enzyme';
import React from 'react';
import { AppRoutes } from '../../config';
import toJson from 'enzyme-to-json';
import { Navigation } from '../../components';
jest.mock('react-redux');
import * as redux from 'react-redux';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
  useSelector: jest.fn(),
}));

describe('component', (): void => {
  describe('Navigation', (): void => {
    beforeEach(() => {
      const spy = jest.spyOn(redux, 'useSelector');
      spy.mockReturnValue({ name: 'Test' });
    });
    it('match snapshot', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders NavLink with correct path', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('NavLink').prop('to')).toBe(AppRoutes.Playlists);
    });
    it('displays user name', (): void => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('span').text()).toBe('hello Test!');
    });
    it('calls clear function upon clicking navigation button', (): void => {
      const wrapper = shallow(<Navigation />);
      wrapper.find('NavLink').simulate('click');

      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
