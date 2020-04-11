import { mount } from 'enzyme';
import React from 'react';

import { Song } from '../../components';
import toJson from 'enzyme-to-json';

describe('component', (): void => {
  describe('Song', (): void => {
    it('match snapshot', (): void => {
      const wrapper = mount(
        <Song
          song={{
            artist: 'Madonna',
            externalUrl: 'test',
            img: 'test',
            songUrl: 'example.com',
            title: 'la bonita',
          }}
        />,
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
