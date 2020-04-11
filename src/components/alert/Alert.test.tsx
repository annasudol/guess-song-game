import { Alert } from '../../components';
import { shallow } from 'enzyme';
import React from 'react';

describe('component', (): void => {
  describe('Alert', (): void => {
    it('renders bad answer alert when points are below 0', (): void => {
      const wrapper = shallow(<Alert points={-10} alert={true} />);
      expect(wrapper.find('div').hasClass('alert--no-points')).toBe(true);
      expect(wrapper.find('div p').text()).toBe('-10');
    });
    it('renders good answer alert when points are higher than 0', (): void => {
      const wrapper = shallow(<Alert points={10} alert={false} />);

      expect(wrapper.find('div div p.alert_score').text()).toBe('10');
    });
  });
});
