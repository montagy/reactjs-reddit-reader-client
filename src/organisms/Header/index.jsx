import React from 'react';
import InlineForm from '../../molecules/InlineForm';

const Header = ({ title, ...rest }) => {
  return (
    <header {...rest}>
      <h1>{title}</h1>
      <InlineForm />
    </header>
  );
};
export default Header;
