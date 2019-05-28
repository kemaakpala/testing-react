import React from 'react';
import {
  render,
  cleanup
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import userEvent from 'user-event';
import IF from './tissue/IF';
import SelectFormField from './atom/select-form-field';
import PostCodeFormField from './atom/post-code-form-field';
import DurationInputFormField from './atom/duration-input-form-field';
import { hashCode } from './utils';
import optionsData from './refData/data';

afterEach(cleanup);

it('renders children if condition is true', () => {
  const isTrue = true;
  const { asFragment } = render(
    <div>
      <IF condition={isTrue}>
        {'testing'}
      </IF>
    </div>
    
  );
  expect(asFragment()).toMatchSnapshot();
});

it('renders a select field from props', () => {
  const optData = optionsData();
  const { asFragment } = render(
    <SelectFormField 
      label="Residential Status"
      name="residentialStatus"
      options={optData}
      placeholder={"Please Select"}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('renders a postCode Form Field', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <PostCodeFormField
      label="PostCode"
      name="currentAddress"
      onChange={onChange}
      value="HA4 0GD"
    />
  );
  userEvent.type(getByTestId("postCodeField"), "HA4 0GD");
  expect(getByTestId("postCodeField")).toMatchSnapshot();
  expect(getByTestId("postCodeField")).toHaveAttribute("value", "HA4 0GD");
});

it('it returns a number hash', () => {
  const str = 'testString';
  const hashString = hashCode(str);
  expect(hashString).toEqual(1727748931);
});

it('matches snapshot of duration fields', ()=> {
  const onChange = jest.fn();
  const newDate = new Date();
  const startYear = 1965;
  const endYear = newDate.getFullYear();
  const duration = endYear - startYear;
  const { getByTestId} = render(
    <DurationInputFormField
      label="When did you move here?"
      name="durationOfStay"
      order="descending"
      durationText="Time at this address"
      startYear={startYear}
      endYear={endYear}
      value={duration}
      onChange={onChange}
    />
  );

  expect(getByTestId("startYear")).toMatchSnapshot();
  expect(getByTestId("endYear")).toMatchSnapshot();
});

test('to Contain Element', () => {
  const onChange = jest.fn();
  const newDate = new Date();
  const startYear = 1965;
  const endYear = newDate.getFullYear();
  const duration = endYear - startYear;

  const { asFragment } = render(
    <DurationInputFormField
      label="When did you move here?"
      name="durationOfStay"
      order="descending"
      durationText="Time at this address"
      startYear={startYear}
      endYear={endYear}
      value={duration}
      onChange={onChange}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
