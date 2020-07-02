import { shallow } from 'enzyme';
import React from 'react';

import { PointsInfo } from './PointsInfo';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('PointsInfo', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<PointsInfo totalScore={10} songNr={5} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
