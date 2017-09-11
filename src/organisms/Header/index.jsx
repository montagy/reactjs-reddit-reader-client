import React from 'react';
import InlineForm from '../../molecules/InlineForm';

const Header = ({ title, onSubmit, ...rest }) => {
  return (
    <header {...rest}>
      <h1>{title}</h1>
      <InlineForm onSubmit={onSubmit} />
    </header>
  );
};
export default Header;
