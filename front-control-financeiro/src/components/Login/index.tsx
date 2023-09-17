import { FormEvent, useState } from 'react';
import { useUsersContext } from '../../hooks/auth/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, LoginContainer, LoginForm } from './styles';




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const auth = useUsersContext();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password ) {
      const isLogged = await auth.signin(email, password);
      if(isLogged) {
        navigate('/teste');
      }
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <LoginContainer>  
        <LoginForm onSubmit={handleLogin}>
         <h2>Login</h2>
         <p>Faz seu cadastro se não tem conta. <Link to="/register">Cadastrar</Link></p>
          <Input
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
        </LoginForm>
    </LoginContainer>
  );
};

export default Login;
