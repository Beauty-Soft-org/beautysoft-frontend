import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { FiChevronDown } from 'react-icons/fi';

function Menu() {
  const [dropdownIcon, setDropdownIcon] = useState(false);
  const [dropdownMore, setDropdownMore] = useState(false);

  function toggleDropdownIcon() {
    setDropdownIcon(!dropdownIcon);
  }

  function toggleDropdownMore() {
    setDropdownMore(!dropdownMore);
  }

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <div>Início</div>
        <div>Sobre</div>
        <div>Contato</div>
        <div>Histórico</div>
        <div className={styles.dropdown}>
          <div className={styles.more} onClick={toggleDropdownMore}>More...</div>
          {dropdownMore && (
            <div className={styles.dropdownMoreContent}>
              <Link to="/procedimentos" className={styles.dropdownLinkProcedimentos}>Procedimentos</Link>
              <Link to="/voucher" className={styles.dropdownLinkVoucher}>Voucher</Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.nameMenu}>
        <h1>Vitoria Garavazzo</h1>
        <h4>Estética Avançada</h4>
      </div>
      <div className={`${styles.menuLogin} ${dropdownIcon ? styles.open : ''}`}>
        <div>Icon</div>
        <div>Foto</div>
        <div className={styles.dropdown}>
          <FiChevronDown className={styles.iconButton} onClick={toggleDropdownIcon} />
          {dropdownIcon && (
            <div className={styles.dropdownContent}>
              <Link to="/login" className={styles.dropdownLinkA}>Login</Link>
              <Link to="/login" className={styles.dropdownLinkB}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;