import React, { useState, useEffect } from "react";
import Config from '../../Config.json';
import axios from "axios";
import InputMask from 'react-input-mask';
import styles from "./perfil.module.css";
import Menu from "../../Components/Menu";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import usuarioPadrao from '../../img/usuarioPadrao.png';
import Table from "../../Components/Table";

function Perfil() {
  const [dataPerfil, setDataPerfil] = useState<any>({
    email: localStorage.getItem('email'),
    nome: localStorage.getItem('nomeExibicao'),
    sobrenome: "",
    telefone: "",
    dataNascimento: "",
    cpf: "",
    cep: "",
    uf: "",
    municipio: "",
    bairro: "",
    rua: "",
    numero: undefined,
  });
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [dataPerfilMensagem, setDataPerfilMensagem] = useState<any>();
  const [aba, setAba] = useState<string>('Perfil');

  async function run() {
    try {

      if (localStorage.getItem('status') === null) {
        navigate('/register');
      }

      const getPerfilUsuario = await axios.get(`${Config.baseUrl}/api/PerfilUsuario/${dataPerfil.email}`);

      const dataNascimentoFormatada = new Date(getPerfilUsuario.data.dataNascimento).toISOString().split('T')[0];

      setDataPerfil((prevState: any) => ({
        ...prevState,
        nome: getPerfilUsuario.data.nome,
        sobrenome: getPerfilUsuario.data.sobrenome,
        telefone: getPerfilUsuario.data.telefone,
        dataNascimento: dataNascimentoFormatada,
        cpf: getPerfilUsuario.data.cpf,
        cep: getPerfilUsuario.data.cep,
        uf: getPerfilUsuario.data.uf,
        municipio: getPerfilUsuario.data.municipio,
        bairro: getPerfilUsuario.data.bairro,
        rua: getPerfilUsuario.data.rua,
        numero: getPerfilUsuario.data.numeroCasa,
      }));

      run2(); // Chama a função para buscar agendamentos após obter o perfil do usuário
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log('Perfil de usuário não encontrado');
      } else {
        console.error('Erro ao obter perfil de usuário:', error);
      }
    }
  }

  async function handleUpdateProfile() {
    try {
      const params = {
        nome: dataPerfil.nome,
        email: dataPerfil.email,
        dataNascimento: dataPerfil.dataNascimento,
        telefone: dataPerfil.telefone,
        cpf: dataPerfil.cpf.toString(),
        cep: dataPerfil.cep,
        uf: dataPerfil.uf,
        municipio: dataPerfil.municipio,
        bairro: dataPerfil.bairro,
        rua: dataPerfil.rua,
        numeroCasa: dataPerfil.numero
      };

      let perfilUsuarioEmail: any;

      try {
        perfilUsuarioEmail = await axios.get(`${Config.baseUrl}/api/PerfilUsuario/${dataPerfil.email}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log('Perfil de usuário não encontrado');
        } else {
          console.error('Erro ao obter perfil de usuário:', error);
        }
      }

      if (perfilUsuarioEmail) {
        localStorage.setItem('nomeExibicao', dataPerfil.nome);
        await axios.put(`${Config.baseUrl}/api/PerfilUsuario/${perfilUsuarioEmail.data.id}`, params);
        setDataPerfilMensagem({ type: "success", message: "Perfil atualizado com sucesso!" });
      } else {
        await axios.post(`${Config.baseUrl}/api/PerfilUsuario`, params);
        localStorage.setItem('nomeExibicao', dataPerfil.nome);
        setDataPerfilMensagem({ type: "success", message: "Perfil cadastrado com sucesso!" });
      }
    } catch (error) {
      setDataPerfilMensagem({ type: "error", message: "Erro ao atualizar/cadastrar perfil. Tente novamente mais tarde." });
    }
  }

  const run2 = () => {
    const apiUrl = `${Config.baseUrl}/api/Agendamentos`;

    axios.get(apiUrl)
      .then((response) => {

        const modifiedData = response.data.filter((item: any) => item.email === localStorage.getItem('email')).map((item: any) => {
          const dataHoraAgendada = new Date(item.dataHoraAgendada);

          const formatoDataHora: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };

          return {
            Nome: item.nome,
            id: item.id,
            Descrição: item.descricao,
            Email: item.email,
            "Tipo de Procedimento": item.tipoProcedimento === 1 ? 'Corporal' : 'Facial',
            'Data e Hora Agendada': dataHoraAgendada.toLocaleString('pt-BR', formatoDataHora),
            Valor: ` R$ ${item.valor}`,
            Tempo: item.tempo,
          };
        });

        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar agendamentos:', error);
      });
  };

  useEffect(() => {
    run();
  }, [])

  useEffect(() => {
    if (dataPerfil.cep) {
      fetch(`https://viacep.com.br/ws/${dataPerfil.cep}/json/`)
        .then(response => response.json())
        .then(data => {
          setDataPerfil({
            ...dataPerfil,
            uf: data.uf,
            municipio: data.localidade,
            bairro: data.bairro,
            rua: data.logradouro,
          });
        })
        .catch(error => console.error(error));
    }
  }, [dataPerfil.cep]);

  return (
    <div>
      <Menu />
      <div className={styles.perfilMenu}>
        <img src={usuarioPadrao} alt="Foto do usuário" className={styles.fotoUsuario} />
        <div className={styles.nomeUsuario}>
          <h2>{dataPerfil.nome}</h2>
        </div>
      </div>
      <div className={styles.perfil}>
        <div className={styles.menu}>
          <span onClick={() => setAba('Perfil')} className={styles.menuItem}>Perfil</span>
          <span onClick={() => setAba('Agendamentos')} className={styles.menuItem}>Meus agendamentos</span>
        </div>
        {aba === 'Perfil' ? (
          <div>
            <div className={styles.title}>
              <h1>Minha conta</h1>
              <p>Veja e edite suas informações pessoais abaixo.</p>
              {dataPerfilMensagem && (
                <p className={dataPerfilMensagem.type === "success" ? styles.success : styles.error}>{dataPerfilMensagem.message}</p>
              )}
            </div>
            <form>
              <div className={styles.perfilGroup}>
                <div className={styles.itemGroup}>
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome" value={dataPerfil.nome}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, nome: e.target.value })}
                  />
                </div>
                <div className={styles.itemGroup}>
                  <label htmlFor="email">E-mail de login:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={dataPerfil.email}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.perfilGroup}>
                <div className={styles.itemGroup}>
                  <label htmlFor="dataNascimento">Data de nascimento:</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={dataPerfil.dataNascimento}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, dataNascimento: e.target.value })}
                  />
                </div>
                <div className={styles.itemGroup}>
                  <label htmlFor="telefone">Telefone:</label>
                  <InputMask
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={dataPerfil.telefone}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, telefone: e.target.value })}
                    mask="(99) 99999-9999"
                  />
                </div>
              </div>
              <div className={styles.perfilGroup}>
                <div className={styles.itemGroup}>
                  <label htmlFor="cpf">CPF:</label>
                  <InputMask
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={dataPerfil.cpf}
                    onChange={(e: any) => setDataPerfil({ ...dataPerfil, cpf: e.target.value })}
                    mask="999.999.999-99"
                  />
                </div>
                <div className={styles.itemGroup}>
                  <label htmlFor="cep">CEP:</label>
                  <InputMask
                    type="text"
                    id="cep"
                    name="cep"
                    value={dataPerfil.cep}
                    onChange={(e: any) => setDataPerfil({ ...dataPerfil, cep: e.target.value })}
                    mask="99999-999"
                  />
                </div>
              </div>
              <div className={styles.perfilGroup}>
                <div className={styles.itemGroup}>
                  <label htmlFor="uf">UF:</label>
                  <input
                    type="text"
                    id="uf"
                    name="uf"
                    value={dataPerfil.uf}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, uf: e.target.value })}
                  />
                </div>
                <div className={styles.itemGroup}>
                  <label htmlFor="municipio">Município:</label>
                  <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    value={dataPerfil.municipio}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, municipio: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.perfilGroup}>
                <div className={styles.itemGroup} style={{ width: '90%' }}>
                  <label htmlFor="bairro">Bairro:</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={dataPerfil.bairro}
                    onChange={(e) => setDataPerfil({ ...dataPerfil, bairro: e.target.value })}
                  />
                </div>
                <div className={styles.groupLogradouro}>
                  <div className={styles.itemGroup} style={{ width: '80%' }}>
                    <label htmlFor="rua">Rua:</label>
                    <input
                      type="text"
                      id="rua"
                      name="rua"
                      value={dataPerfil.rua}
                      onChange={(e) => setDataPerfil({ ...dataPerfil, rua: e.target.value })}
                    />
                  </div>
                  <div className={styles.itemGroup} style={{ width: '15%' }}>
                    <label htmlFor="numero">Número:</label>
                    <input
                      style={{ width: '20%' }}
                      type="number"
                      id="numero"
                      name="numero"
                      value={dataPerfil.numero}
                      onChange={(e) => setDataPerfil({ ...dataPerfil, numero: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.buttons}>
                <button type="button" onClick={handleUpdateProfile}>Atualizar</button>
                <Link to='/' className={styles.buttonVoltar}>Voltar</Link>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.visualizarBox}>
            {data.length === 0 ? <span className={styles.titleVisualizar}>Você não possui agendamentos para serem exibidos.</span> :
              <div>
                <span className={styles.titleVisualizar}>{data.length === 1 ? 'Meu Agendamento' : 'Meus Agendamentos'}</span>
                <div className={styles.contentTable}>
                  <Table data={data} />
                </div>
              </div>
            }
          </div>
        )}
      </div >
      <Footer />
    </div >
  );
}

export default Perfil;
