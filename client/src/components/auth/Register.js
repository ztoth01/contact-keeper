import React, { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useSpring, animated, useChain } from 'react-spring';

const Register = props => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [imageName, setImageName] = useState('Choose profile image');
  const [open, set] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
    password2: '',
    email: '',
    profileImage: ''
  });

  const animateRef = useRef();
  const animate = useSpring({
    ref: animateRef,
    to: { maxHeight: open ? '800px' : '130px' },
    from: { maxHeight: '130px' },
  });

  const fadeRef = useRef();
  const fade = useSpring({
    ref: fadeRef,
    to: { opacity: open ? '1' : '0' }
  });

  useChain(open ? [animateRef, fadeRef] : [fadeRef, animateRef], [0, open ? 0.5 : 1]);

  const { registerUser, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const { name, email, password, password2, profileImage } = user;

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

  const onFileSelected = e => {
    if (e.target.files[0].name.lastIndexOf('.') <= 0) {
      return alert('Please make sure you use a valid file type')
    }
    setUser({ ...user, profileImage: e.target.files[0] });
    setImageName(e.target.files[0].name);
  }

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords don\'t match', 'danger', 2000);
    } else if (name === '' || email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger', 2000);
    } else {
      registerUser({ name, email, password, profileImage });
    }
  }

  return (
    <animated.div className='form-container register-form' style={animate}>
      {!open ? (
        <div style={{
          display: 'flex',
          position: 'absolute',
          top: '30px',
        }}
          onClick={() => set(open => true)}>
          <i className="fas fa-minus" /><span style={{
            textAlign: 'center',
            alignSelf: 'center',
            marginRight: '5px'
          }}>Click to open</span>
        </div>
      ) : (
          <div style={{ display: 'flex' }} onClick={() => set(open => false)}> <i className="fas fa-times" /><span style={{
            position: 'absolute',
            top: '30px',
            textAlign: 'center'
          }}>Click to close</span></div>)}
      <h1>Account <span className='text-primary'>Register</span></h1>
      <form onSubmit={onSubmit}>
        <animated.div className="form-group" style={fade}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </animated.div>
        <animated.div className="form-group" style={fade}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </animated.div>
        <animated.div className="form-group" style={fade}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </animated.div>
        <animated.div className="form-group" style={fade}>
          <label htmlFor="password2">Confirm Passoword</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </animated.div>
        <animated.div className="form-group custom-file" style={fade}>
          <input type="file" className="custom-file-input" name="profileImage" onChange={onFileSelected} />
          <label htmlFor="profileImage" className="custom-file-label">{imageName}</label>
        </animated.div>
        <animated.input type="submit" value="Register" className="btn btn-primary btn-block" style={fade} />
      </form>
    </animated.div >
  )
}

export default Register;
