/* eslint-disable jest/expect-expect */
import * as redux from 'react-redux';
import { Search } from '../../components';
import { act } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

jest.mock('react-redux');

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDispatch: (): jest.Mock<any, any> => mockDispatch,
  useSelector: jest.fn(),
}));

describe('component', (): void => {
  describe('Search', (): void => {
    it('match snapshot', (): void => {
      const spy = jest.spyOn(redux, 'useSelector');

      spy.mockReturnValue({
        token:
          'BQAY_Ky0EiDo4z-U-oC2rYg5aF_kcSUhbukZ7BOJkXYQJzI-ChNz0hrULaIAoTmZ6s3_W_8n2LBh6_OKm5vgtvthrWLaPnGwYutjlGFW4cwQKqvN3ovaJmksGuzj5inFTH3UpEJ6_biTyDr_0w52EBirZQLGDN42mtS7ygfv2Nz',
      });
    });

    const wrapper = shallow(<Search />);

    // eslint-disable-next-line jest/no-standalone-expect
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('change input value when calling onChange function', (): void => {
    const wrapper = shallow(<Search />);

    wrapper.find('input').prop<Function>('onChange')({
      target: { value: 'test' },
    });

    expect(wrapper.find('input').prop('value')).toBe('test');
  });

  it('calls handleSubmit function after submit form', (): void => {
    const wrapper = shallow(<Search />);
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
    };

    act(() => {
      wrapper.find('form').prop<Function>('onSubmit')(mockEvent);
    });

    wrapper.update();
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('calls dispatch after change input and submit', (): void => {
    const wrapper = shallow(<Search />);
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
    };

    act(() => {
      wrapper.find('input').prop<Function>('onChange')({
        target: { value: 'test' },
      });

      wrapper.find('form').prop<Function>('onSubmit')(mockEvent);
    });

    wrapper.update();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
