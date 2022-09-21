import { useForm } from '../hooks/useForm.js'
import AuthForm from './AuthForm';

function Login({ onAuthorize, buttonText, title}) {
  const { values, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize(values.email, values.password);
  } 
  
return (
  <AuthForm
    nameEmail="email"
    namePassword="password"
    title={title}
    buttonText={buttonText}
    onSubmit={handleSubmit}
    onChange={handleChange}
    emailValue={values.email}
    passwordValue={values.password}/>
);
}

export default Login;