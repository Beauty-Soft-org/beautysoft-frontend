import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const status = localStorage.getItem('status');

  function sair() {
    navigate('/')
    localStorage.clear();
  }

  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <Link to="/" className={styles.link}>Início</Link>
        <Link to="/sobre" className={styles.link}>Sobre</Link>
        {(status === 'Usuario' || status === 'Admin') &&
          <Link to="/servicos" className={styles.link}>Agendamento</Link>
        }
        {status === 'Admin' &&
          <div className={styles.dropdown}>
            <div className={styles.more} onClick={toggleDropdownMore}>Mais...</div>
            {dropdownMore && (
              <div className={styles.dropdownMoreContent}>
                <Link to="/procedimentos" className={styles.dropdownLinkProcedimentos}>Procedimentos</Link>
                <Link to="/voucher" className={styles.dropdownLinkVoucher}>Voucher</Link>
                <Link to="/cadastroMensagens" className={styles.dropdownLinkVoucher}>Mensagens</Link>
                <Link to="/visualizarAgendamentos" className={styles.dropdownLinkVoucher}>Visualizar Agendamentos</Link>
                <Link to="/cadastroHorarios" className={styles.dropdownLinkVoucher}>Cadastro Horarios</Link>
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
        <Link to="/perfil" className={styles.iconPerfil}><FaUserCircle style={{ fontSize: '2.2rem' }} /></Link>
        <div className={styles.dropdownLogoff}>
          <FiChevronDown className={styles.iconButton} style={{ fontSize: '2rem' }} onClick={toggleDropdownIcon} />
          {dropdownIcon && localStorage.getItem('email') === null ? (
            <div className={styles.dropdownContent}>
              <Link to="/login" className={styles.dropdownLinkA}>Login</Link>
              <Link to="/register" className={styles.dropdownLinkB}>Register</Link>
            </div>
          ) : dropdownIcon &&
          <div className={styles.dropdownContent}>
            <div onClick={() => sair()} className={styles.dropdownLinkA}>Sair</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Menu;