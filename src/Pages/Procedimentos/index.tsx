import React, { useEffect, useState } from 'react';
import styles from './procedimentos.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia';

const Procedimentos: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipoProcedimento, setTipoProcedimento] = useState<number>(1);
  const [imagem, setImagem] = useState<File | null>(null);
  const [data, setData] = useState([]);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [row, setRow] = useState<number>();
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [descricaoError, setDescricaoError] = useState<string | null>(null);
  const [valorError, setValorError] = useState<string | null>(null);
  const [habilitado, setHabilitado] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files && e.target.files[0].type.startsWith('image/')) {
        setImagem(e.target.files[0]);
      } else {
        setImagem(null);
      }
    }
  };

  const handleClickCadastro = () => {

    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");
    setValorError(valor ? null : "Valor é obrigatório!");

    const filter = {
      nome,
      descricao,
      valor,
      inserirArquivo: 'Temporária',
      tipoProcedimento,
    }

    const apiUrl = 'http://localhost:5082/api/Procedimento';

    axios.post(apiUrl, filter)
      .then((_response) => {
        setRefresh(!refresh)
        limpar();
        console.log('Procedimento cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

  const handleClickAlterar = () => {
    const filter = {
      nome,
      descricao,
      valor,
      inserirArquivo: 'Temporária',
      tipoProcedimento,
    }

    const apiUrl = `http://localhost:5082/api/Procedimento/${row}`;

    axios.put(apiUrl, filter)
      .then((_response) => {
        console.log('Procedimento alterado com sucesso!');
        setRefresh(!refresh);
        setAlterar(false);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao alterar procedimento:', error);
      });
  };

  function limpar() {
    setNome('');
    setDescricao('');
    setValor('');
    setTipoProcedimento(1);
    setImagem(null);
  }

  const run = () => {
    const apiUrl = 'http://localhost:5082/api/Procedimento';

    axios.get(apiUrl)
      .then((response) => {
        console.log('Procedimentos exibidos com sucesso!');
        const modifiedData = response.data.map((item: any) => {
          return {
            Nome: item.nome,
            id: item.id,
            Descrição: item.descricao,
            "Tipo de Procedimento": item.tipoProcedimento === 1 ? 'Corporal' : 'Facial',
            Imagem: item.inserirArquivo,
            Valor: ` R$ ${item.valor}`,
          };
        });

        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar procedimentos:', error);
      });
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este procedimento?');

    if (confirmDelete) {
      const apiUrl = `http://localhost:5082/api/Procedimento/${index}`;

      axios.delete(apiUrl)
        .then((_response) => {
          setRefresh(!refresh);
          console.log('Procedimento deletado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao deletar procedimento:', error);
        });
    }
  };

  const handleEdit = (index: number) => {
    setAlterar(true);
    setRow(index);

    const apiUrl = `http://localhost:5082/api/Procedimento/${index}`;

    axios.get(apiUrl)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setValor(response.data.valor);
        setTipoProcedimento(response.data.tipoProcedimento);
        setImagem(response.data.inserirArquivo);
      })
      .catch((error) => {
        console.error('Erro ao buscar procedimento:', error);
      });

  };

  function voltarCadastro() {
    setAlterar(false);
    limpar();
  }

  useEffect(run as any, [refresh]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem procedimentos para serem exibidos</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Procedimento' : 'Procedimentos'}</span>
            <div className={styles.contentTable}>
              <Table data={data} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
          </div>
        }
      </div>
      <div className={styles.cadastroBox}>
        {alterar === true ? <h2>Alterar Procedimento</h2> : <h2>Cadastro de Procedimentos</h2>}
        <div className={styles.formGroup}>
          <label>Nome:</label>
          {nomeError && <span className={styles.errorText}>{nomeError}</span>}
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descrição:</label>
          {descricaoError && <span className={styles.errorText}>{descricaoError}</span>}
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Valor:</label>
          {valorError && <span className={styles.errorText}>{valorError}</span>}
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tipo de Procedimento:</label>
          <select
            value={tipoProcedimento}
            onChange={(e) => {
              if (e.target.value === "1") {
                setTipoProcedimento(1);
              } else if (e.target.value === "2") {
                setTipoProcedimento(2);
              }
            }}
          >
            <option className={styles.option} value="1">Corporal</option>
            <option className={styles.option} value="2">Facial</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Habilitado:</label>
          {(habilitado === true ?
            <LiaToggleOnSolid className={styles.toggle} onClick={() => setHabilitado(false)} /> :
            <LiaToggleOffSolid className={styles.toggle} onClick={() => setHabilitado(true)} />)}
        </div>
        <button className={styles.cadastroButton} onClick={alterar === true ? handleClickAlterar : handleClickCadastro}>
          {alterar === true ? <span>Alterar</span> : <span>Cadastrar</span>}
        </button>
        {alterar === true ?
          <button onClick={voltarCadastro} className={styles.voltarButton}>
            Voltar para o cadastro
          </button> :
          <Link to="/">
            <button className={styles.voltarButton}>
              Voltar para o menu
            </button>
          </Link>}
      </div>
    </div>
  );
};

export default Procedimentos;