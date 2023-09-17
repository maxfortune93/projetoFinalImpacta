import { FormEvent, useState } from 'react';
import { Button, Input, RegisterContainer, RegisterForm } from './styles';
import { useUsersContext } from '../../hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = useUsersContext();
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === confirmPassword) {
        const isLogged = await auth.signup(name, email, password, confirmPassword);
      if(isLogged) {
        navigate('/teste');
      }
    } else {
      alert('As senhas não coincidem');
    }
  };

  return (
    <RegisterContainer>
        <RegisterForm onSubmit={handleRegister}>
        <h2>Cadastrar</h2>
          <Input
            type="text"
            placeholder=" Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Registrar</Button>
        </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
