import { shallow } from 'enzyme';
import React from 'react';

import { Timer } from '../../components';

describe('component', (): void => {
  describe('Timer', (): void => {
    it.each`
      value | formatted
      ${30} | ${' 00 : 00'}
      ${15} | ${' 00 : 15'}
      ${20} | ${' 00 : 10'}
      ${0}  | ${' 00 : 30'}
    `('renders $formatted when given timer prop $value', ({ value, formatted }): void => {
      const wrapper = shallow(<Timer time={value} />);

      expect(wrapper.text()).toBe(formatted);
    });

    it('is rendered with animated red class when given prop time is below 20', (): void => {
      const wrapper = shallow(<Timer time={21} />);

      expect(wrapper.hasClass('timer animated red')).toBeTruthy();
    });
  });
});
