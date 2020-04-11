import { shallow, mount } from 'enzyme';
import React from 'react';

import { App } from './App';
import toJson from 'enzyme-to-json';
import { Login, Navigation } from './components';
jest.mock('react-redux');
const useSelector = require('react-redux').useSelector as jest.Mock;

describe('component', (): void => {
  describe('App', (): void => {
    it('renders Login token is not defined', (): void => {
      useSelector.mockReset();

      const wrapper = shallow(<App />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders Navigation and Router when token is given', (): void => {
      useSelector.mockReturnValue({
        getToken:
          'BQAY_Ky0EiDo4z-U-oC2rYg5aF_kcSUhbukZ7BOJkXYQJzI-ChNz0hrULaIAoTmZ6s3_W_8n2LBh6_OKm5vgtvthrWLaPnGwYutjlGFW4cwQKqvN3ovaJmksGuzj5inFTH3UpEJ6_biTyDr_0w52EBirZQLGDN42mtS7ygfv2Nz',
      });
      const wrapper = shallow(<App />);
      expect(wrapper.containsMatchingElement(<Login />)).toEqual(false);

      expect(wrapper.containsMatchingElement(<Navigation />)).toEqual(true);
    });

    it('match snapshot', (): void => {
      useSelector.mockReturnValue({
        getToken:
          'BQAY_Ky0EiDo4z-U-oC2rYg5aF_kcSUhbukZ7BOJkXYQJzI-ChNz0hrULaIAoTmZ6s3_W_8n2LBh6_OKm5vgtvthrWLaPnGwYutjlGFW4cwQKqvN3ovaJmksGuzj5inFTH3UpEJ6_biTyDr_0w52EBirZQLGDN42mtS7ygfv2Nz',
      });
      const wrapper = shallow(<App />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
