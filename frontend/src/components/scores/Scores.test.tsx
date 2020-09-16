import { shallow } from 'enzyme';
import React from 'react';

import { Scores } from './Scores';
import toJson from 'enzyme-to-json';
jest.mock('react-redux');
const useSelector = require('react-redux').useSelector as jest.Mock;

describe('component', (): void => {
  describe('Scores', (): void => {
    useSelector.mockReturnValue({
      getToken: 'BQAY_Ky0EiDo4z-U-oC2rYg5aF_kcSUhbukZ7BOJkXYQJzI-ChNz0hrULaIAoTmZ6s3_W_8n2LBh6_OKm5vgtvthrWLaPnGwYutjlGFW4cwQKqvN3ovaJmksGuzj5inFTH3UpEJ6_biTyDr_0w52EBirZQLGDN42mtS7ygfv2Nz',
    });
    it('match snapshot', (): void => {
      const wrapper = shallow(<Scores />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders reducer info', (): void => {
      useSelector.mockReturnValue({
        name: 'test',
        image: 'simple image',
        userId: '123id',
      });
      const wrapper = shallow(<Scores />);

      expect(wrapper.find('h2.font-albaSuper').text()).toBe('hello test!');
      expect(
        wrapper
          .find('p')
          .at(0)
          .text()
      ).toBe('Total Games');
      expect(
        wrapper
          .find('p')
          .at(1)
          .text()
      ).toBe('Total Points');
    });
  });
});
