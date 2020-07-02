import { shallow } from 'enzyme';
import React from 'react';

import { ErrorMessage } from '..';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('ErrorMessage', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<ErrorMessage message="test" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders title', (): void => {
      const wrapper = shallow(<ErrorMessage message="test" />);
      expect(wrapper.find('div h2').text()).toBe('test');
    });
  });
});
