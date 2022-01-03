import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Logo from '../../olx-logo.png';
import { AppContext } from '../../store/Context';
import './Signup.css';
import { Firebase } from '../../firebase/configure';
import { getFirestore, collection, getDocs, addDoc ,doc,deleteDoc,setDoc
} from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const {Firebase} = useContext(AppContext)
  const db = getFirestore(Firebase);
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(Firebase);
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email,password)
  .then((userCredential) => {
    
    console.log(userCredential);
    const user = userCredential.user;
    const prductsCollection = collection(db,'user')
   addDoc(prductsCollection,{
     userName:username,
     phone:phone,
     id:user.uid
    
   })
   .then((result)=>{
    navigate('/login')
    console.log(result);
   })
    
  })

  .catch((error) => {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    
  });
  
   
  }
  
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{setusername(e.target.value)}}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setphone(e.target.value)}}
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
