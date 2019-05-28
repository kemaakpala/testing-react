import React from 'react';
import { hashCode } from '../utils';

const selectFormField = (props) => {
  const {label, name, options, value, onChange, placeholder} = props;
  const renderOptions = () => {
    const hasOptions = (Array.isArray(options) && options.length);
    return (
      (hasOptions)
      ? options.map((option) => {
        const { title, value } = option;
        const optKey = hashCode(title+value);
        return ( <option key={optKey} value={value}>{title}</option> );
      })
      : null
    ); 
  };

  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name}>
        <option value="">{placeholder}</option>
        {renderOptions()}
      </select>
    </React.Fragment>
  );
};

export default selectFormField;