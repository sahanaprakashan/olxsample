import React, { useState ,useContext} from 'react';
// import { Firebase } from '../../firebase/configure';
import { getFirestore
} from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth"
import { AppContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';


 function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {Firebase} = useContext(AppContext)
  const db = getFirestore(Firebase);
  const handleLogin=(e)=>{
    e.preventDefault()
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        navigate('/')
        console.log(userCredential);
        const user = userCredential.user;
        
  })
  .catch((error) => {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    
  });}
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin} >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}
 
export default Login
