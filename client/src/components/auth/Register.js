import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [user, setUser] = useState({
    name: '',
    password: '',
    password2: '',
    email: ''
  });

  const { registerUser, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error) {
      setAlert(error, 'danger', 2000);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords don\'t match', 'danger', 2000);
    } else if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger', 2000);
    } else {
      registerUser({ name, email, password });
    }
  }

  return (
    <div className='form-container'>
      <h1>Account <span className='text-primary'>Register</span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Passoword</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register;
