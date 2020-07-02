import { mount } from 'enzyme';
import React from 'react';

import toJson from 'enzyme-to-json';
import { Image } from '../../components';

describe('component', (): void => {
  describe('Image', (): void => {
    it('match snapshot with medium size image', (): void => {
      const image = mount(<Image src={require('url')} size="medium" alt="test" />);
      expect(toJson(image)).toMatchSnapshot();
    });
    it('match snapshot with small size image', (): void => {
      const image = mount(<Image src={require('url')} size="small" alt="test" />);
      expect(toJson(image)).toMatchSnapshot();
    });
    it('match snapshot with large size and rounded image', (): void => {
      const image = mount(<Image src={require('url')} size="large" alt="test" rounded="full" />);
      expect(toJson(image)).toMatchSnapshot();
    });
  });
});
