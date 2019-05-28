
const IF = (props) => {
  const {condition, children} = props;
  return (condition) ? children : null;
} ;

export default IF;