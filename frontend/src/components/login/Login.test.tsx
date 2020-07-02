import { shallow, mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Login } from '../../components';
jest.mock('react-redux');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
}));

describe('component', (): void => {
  describe('Login', (): void => {
    it('match snapshot', (): void => {
      const login = shallow(<Login />);
      expect(toJson(login)).toMatchSnapshot();
    });
    it('calls dispatch', (): void => {
      mount(<Login />);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
