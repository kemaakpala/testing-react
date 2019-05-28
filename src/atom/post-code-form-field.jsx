import React from 'react';

const PostCodeFormField = (props) => {
  const {name, label, value, onChange} = props;
  return (
    <React.Fragment>
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        name={name} 
        value={value}
        onChange={onChange}
        data-testid="postCodeField"
      />
    </React.Fragment>
  )
};

export default PostCodeFormField;