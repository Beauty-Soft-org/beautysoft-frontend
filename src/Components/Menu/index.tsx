import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from "react-icons/fa";

function Menu() {
  const [dropdownIcon, setDropdownIcon] = useState(false);
  const [dropdownMore, setDropdownMore] = useState(false);

  function toggleDropdownIcon() {
    setDropdownIcon(!dropdownIcon);
  }

  function toggleDropdownMore() {
    setDropdownMore(!dropdownMore);
  }

  const status = localStorage.getItem('status');

  console.log('status', status)

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <Link to="/" className={styles.link}>Início</Link>
        <Link to="/sobre" className={styles.link}>Sobre</Link>
        {(status === 'Usuario' || status === 'Admin') &&
          <Link to="/servicos" className={styles.link}>Agendamento</Link>
        }
        <div>Histórico</div>
        {status === 'Admin' &&
          <div className={styles.dropdown}>
            <div className={styles.more} onClick={toggleDropdownMore}>Mais...</div>
            {dropdownMore && (
              <div className={styles.dropdownMoreContent}>
                <Link to="/procedimentos" className={styles.dropdownLinkProcedimentos}>Procedimentos</Link>
                <Link to="/voucher" className={styles.dropdownLinkVoucher}>Voucher</Link>
                <Link to="/cadastroMensagens" className={styles.dropdownLinkVoucher}>Mensagens</Link>
                <Link to="/visualizarAgendamentos" className={styles.dropdownLinkVoucher}>Visualizar Agendamentos</Link>
              </div>
            )}
          </div>
        }
      </div>
      <div className={styles.nameMenu}>
        <h1>Vitória Garavazzo</h1>
        <h4>Estética Avançada</h4>
      </div>
      <div className={`${styles.menuLogin} ${dropdownIcon ? styles.open : ''}`}>
        <div><FaUserCircle style={{ fontSize: '2.2rem' }} /></div>
        <div className={styles.dropdown}>
          <FiChevronDown className={styles.iconButton} style={{ fontSize: '2rem' }} onClick={toggleDropdownIcon} />
          {dropdownIcon && (
            <div className={styles.dropdownContent}>
              <Link to="/login" className={styles.dropdownLinkA}>Login</Link>
              <Link to="/register" className={styles.dropdownLinkB}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;