import { ButtonLogout } from '../../components';
import { shallow } from 'enzyme';
import React from 'react';
import hash from '../../config/hash';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
}));

describe('component', (): void => {
  describe('ButtonLogout', (): void => {
    it('renders default image when imgSrc is not given', (): void => {
      const wrapper = shallow(<ButtonLogout />);
      const img = wrapper.find('Image');

      expect(img.prop('src')).toBe('user_no_photo_600x600.png');
    });

    it('renders image when imgSrc is given', (): void => {
      const wrapper = shallow(<ButtonLogout imgSrc="../../assets/images/png/noimage.png" />);

      const img = wrapper.find('Image');

      expect(img.prop('src')).toBe('../../assets/images/png/noimage.png');
    });

    it('return hash null upon clicking logout', (): void => {
      const wrapper = shallow(<ButtonLogout />);

      wrapper.find('Link').simulate('click');
      wrapper.update();
      expect(hash['access_token']).toBe(null);
    });
  });
});
