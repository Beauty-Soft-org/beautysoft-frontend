import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.containerContato}>
        <h4 className={styles.title}>Contato</h4>
        <p className={styles.text}>
          <strong>WhatsApp:</strong> (47) 98839-3423
        </p>
        <p className={styles.text}>
          <strong>E-mail:</strong> vitoriagaravazzo3@gmail.com
        </p>
      </div>
      <div className={styles.containerRedesSociais}>
        <h4 className={styles.title}>Redes Sociais</h4>
        <ul>
          <li>
            <a className={styles.redesSociais} href="https://m.facebook.com/vitoria.garavazzo/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className={styles.icon} /> <span className={styles.textIcon}>Facebook</span>
            </a>
          </li>
          <li>
            <a className={styles.redesSociais} href="https://www.instagram.com/vg.esteticaavancada/?igshid=NzZlODBkYWE4Ng%3D%3D" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.icon} /> <span className={styles.textIcon}>Instagram</span>
            </a>
          </li>
          <li>
            <a className={styles.redesSociais} href="https://wa.me/message/WOR2J4MMRTLQJ1" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className={styles.icon} /> <span className={styles.textIcon}>WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
