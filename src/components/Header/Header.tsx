import React from 'react';
import logo from '../../assets/Images/logo.png';
import styles from './Header.module.css';
import { Button } from 'antd';

const Header:React.FC = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href={'/'}>
          <img src={logo} alt='Logo' width={60} />
          <div className={styles.logo__text}><span>Frog</span>Blog</div>
        </a>
        <Button style={{borderColor: '#779a42'}} href={'/about'}>About</Button>
    </header>
  )
}

export default Header;