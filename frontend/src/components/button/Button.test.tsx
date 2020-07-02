import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { Button } from '../../components';

describe('component', (): void => {
  describe('button', (): void => {
    it('match snapshot', (): void => {
      const wrapper = shallow(<Button>test</Button>);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('match snapshot when href', (): void => {
      const wrapper = shallow(
        <Button href={{ path: '/test', target: true }} spacing={{ mt: '10' }}>
          test
        </Button>
      );

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('match snapshot with mainBtn class', (): void => {
      const wrapper = shallow(<Button mainBtn>test</Button>);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
