import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Config from '../../Config.json';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {

    setEmailError(email ? null : "Email é obrigatório!");
    setPasswordError(password ? null : "Senha é obrigatória!");

    const apiUrl = `${Config.baseUrl}/api/Usuarios/login`;

    const params = { enderecoEmail: email, senha: password }

    axios.post(apiUrl, params)
      .then((response) => {
        setData(response.data);
        localStorage.setItem('status', response.data.status === "" ? 'Usuario' : response.data.status);
        navigate('/');
      })
      .catch((error) => {
        alert('Erro ao fazer login.');
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