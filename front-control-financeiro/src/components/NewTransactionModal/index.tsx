import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
// import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg';
import { useTransactionServices } from '../../services/useTransactionsServices';
import { useNavigate } from 'react-router-dom';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  editedTransaction: any | null;
}

export function NewTransactionModal({ isOpen, onRequestClose, editedTransaction }: NewTransactionModalProps) {
//   const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');
  const { create, updateTransactions } = useTransactionServices();
  const navigate = useNavigate();

  const initialize = async() => {

    if (editedTransaction) {
        setTitle(editedTransaction.title);
        setAmount(editedTransaction.amount);
        setType(editedTransaction.type);
        setCategory(editedTransaction.category);
      }
    
  };
  async function handleSaveTransaction(event: FormEvent) {
    event.preventDefault();
    
    const createdAt = new Date().toISOString();
    let payload;
    if(editedTransaction?.id){
        payload ={
            title,
            amount,
            type,
            category,
            id: editedTransaction.id,
            // createdAt,
        }
    }
    
    let result = editedTransaction?.id ? await updateTransactions(payload) : await create(
        title,
        amount,
        type,
        category,
        createdAt,
        // userEmail,
      );
    

    if(result){
        navigate('/teste');
    }

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  
  useEffect(() => {
    initialize()
  }, [editedTransaction]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleSaveTransaction}>
        <h2>{!editedTransaction?.id ? 'Cadastrar transação' : 'Transação'}</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            actived={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            actived={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          {!editedTransaction?.id ? 'Cadastrar' : 'Salvar'}
        </button>

      </Container>
    </Modal>
  )
}