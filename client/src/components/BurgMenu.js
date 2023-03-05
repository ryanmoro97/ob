import React from 'react';
import { bubble as Menu } from 'react-burger-menu';
import '../styles/BurgMenu.css'

function BurgMenu() {
  return (
    <Menu>
      <a className='menu-item' href='/products'>Products</a>
      <a className='menu-item' href='/sumelse'>SumElse</a>
    </Menu>
  );
}

export default BurgMenu;
