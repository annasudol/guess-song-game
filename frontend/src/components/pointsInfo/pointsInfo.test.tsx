import { shallow } from 'enzyme';
import React from 'react';

import { PointsInfoMemorized } from './PointsInfo';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('PointsInfoMemorized', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<PointsInfoMemorized totalScore={10} songNr={5} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
