import React from 'react';
const DurationInputFormField = (props) => {
  const {label, name, startYear, endYear, durationOfText,onChange, value} = props;
  return (
    <React.Fragment>
      <div>{ label }</div>
      <p>
        <span>{ durationOfText }</span>
      </p>
      <label htmlFor="startYear"></label>
      <input
        id="startYear"
        type="text"
        name={name}
        value={startYear}
        onChange={onChange}
        data-testid="startYear"
      />
      <label htmlFor="endYear"></label>
      <input
        id="endYear"
        type="text"
        name={name}
        value={endYear}
        onChange={onChange}
        data-testid="endYear"
      />
      <div data-testid="parent">
        <span data-id="child">{ value }</span>
      </div>
      
    </React.Fragment>
  );
};

export default DurationInputFormField;
