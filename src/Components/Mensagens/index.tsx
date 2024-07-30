import React from 'react';
import styles from './mensagens.module.css';

interface MensagemProps {
  imageUrl: string;
  title: string;
  text: string;
}

const Mensagem: React.FC<MensagemProps> = ({ imageUrl, title, text }) => {
  return (
    <div style={{ paddingBottom: '14rem' }}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl ? `/imagens/${imageUrl}` : "https://via.placeholder.com/300"}
          alt={title}
          style={{ maxWidth: '100%', width: '300px', height: '300px' }}
        />
        <div className={styles.textOverlay}>
          <h2 className={styles.title}>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Mensagem;
