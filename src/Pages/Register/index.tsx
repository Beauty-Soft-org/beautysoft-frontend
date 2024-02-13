import React, { useState } from 'react';
import styles from './register.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Config from '../../Config.json';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState<any>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nomeUsuarioError, setNomeUsuarioError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = () => {

    setEmailError(password ? null : "Email é obrigatório!");
    setPasswordError(email ? null : "Senha é obrigatória!");
    setNomeUsuarioError(nomeUsuario ? null : "Nome de usuário é obrigatório!");

    if (confirmPassword !== password) {
      setConfirmPasswordError("As senhas não são iguais!");
    } else if (email && nomeUsuario && password) {
      const apiUrl = `${Config.baseUrl}/api/Usuarios/register`;
      setConfirmPasswordError(null);

      const params = {
        nomeUsuario,
        enderecoEmail: email,
        senha: password,
        confirmSenha: confirmPassword
      }

      axios.post(apiUrl, params)
        .then((response) => {
          setData(response.data);
          alert('Cadastro realizado com sucesso!');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Erro ao fazer o registro:', error);
          alert('Erro ao realizar o cadastro!');
        });
    }
  };

  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
          <h2>Register</h2>
          <div className={styles.formGroup}>
            <label>Nome de Usuário:</label>
            {nomeUsuarioError && <span className={styles.errorText}>{nomeUsuarioError}</span>}
            <input
              type="nomeUsuario"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            {emailError && <span className={styles.errorText}>{emailError}</span>}
            <input
              type="e-mail"
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