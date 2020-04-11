import { shallow } from 'enzyme';
import React from 'react';

import { ScoreInfo } from '../../components';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('ScoreInfo', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<ScoreInfo totalScore={10} songNr={5} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
