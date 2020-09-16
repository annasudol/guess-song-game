import { shallow } from 'enzyme';
import React from 'react';

import { ScoresItems } from './ScoresItems';
import toJson from 'enzyme-to-json';
jest.mock('react-redux');
const useSelector = require('react-redux').useSelector as jest.Mock;
const playlistIds = ['2GiFTnxorbfpgrXJYek2hv', '37i9dQZF1DXc3KygMa1OE7'];
const scoresDB = [{ '2GiFTnxorbfpgrXJYek2hv': { date: '2020-04-15T14:19:58.738Z', points: -30 } }, { '37i9dQZF1DXc3KygMa1OE7': { date: '2020-04-15T16:50:33.987Z', points: -40 } }];
describe('component', (): void => {
  describe('ScoresItems', (): void => {
    useSelector.mockReturnValue({
      getToken: 'BQAY_Ky0EiDo4z-U-oC2rYg5aF_kcSUhbukZ7BOJkXYQJzI-ChNz0hrULaIAoTmZ6s3_W_8n2LBh6_OKm5vgtvthrWLaPnGwYutjlGFW4cwQKqvN3ovaJmksGuzj5inFTH3UpEJ6_biTyDr_0w52EBirZQLGDN42mtS7ygfv2Nz',
    });
    it('match snapshot', (): void => {
      const wrapper = shallow(<ScoresItems playlistIds={playlistIds} scoresDB={scoresDB} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
