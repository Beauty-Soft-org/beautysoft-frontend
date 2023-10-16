import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleLogin = () => {

    setEmailError(password ? null : "Email é obrigatório!");
    setPasswordError(email ? null : "Senha é obrigatória!");

    const apiUrl = 'http://localhost:5080/Users/Details/5';
    axios.get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Login</h2>
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
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
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

export default Login;