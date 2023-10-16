import React, { useState } from 'react';
import styles from './register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleRegister = () => {

    setEmailError(password ? null : "Email é obrigatório!");
    setPasswordError(email ? null : "Senha é obrigatória!");

    if (confirmPassword !== password) {
      setConfirmPasswordError("As senhas não são iguais!");
    } else {
      const apiUrl = 'http://localhost:5080/Users/Details/5';
      setConfirmPasswordError(null);
      axios.get(apiUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Erro ao fazer o registro:', error);
        });
    }
  };

  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
          <h2>Register</h2>
          <div className={styles.formGroup}>
            <label>Email:</label>
            {emailError && <span className={styles.errorText}>{emailError}</span>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Senha:</label>
            {passwordError && <span className={styles.errorText}>{passwordError}</span>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmar Senha:</label>
            {confirmPasswordError && <span className={styles.errorText}>{confirmPasswordError}</span>}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className={styles.registerButton} onClick={handleRegister}>
            Cadastrar
          </button>
          <Link to="/">
            <button className={styles.voltarButton}>
              Voltar para o menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;