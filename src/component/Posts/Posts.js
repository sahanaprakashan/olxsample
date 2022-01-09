import React, { useContext, useEffect, useState } from "react";
import { Firebase } from "../../firebase/configure";
import Heart from "../../assets/Heart";
import { AppContext } from "../../store/Context";
import "./Post.css";
import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore/lite";
import { Viewcontext } from "../../store/Viewcontext";
import { useNavigate } from "react-router-dom";
const db = getFirestore(Firebase);

function Posts() {
  const { Firebase } = useContext(AppContext);
  const [post, setpost] = useState([]);
  const prductsCollection = collection(db, "products");
  const {setdetail} = useContext(Viewcontext)
  const navigate=useNavigate()

  useEffect(() => {
    getDocs(prductsCollection).then((snapshot) => {
      // console.log("========", snapshot.docs);
      const prductsList = snapshot.docs.map((doc) => {
        // console.log(doc.data());
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      // console.log(prductsList);
      setpost(prductsList);
      // console.log(post);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        
            <div  className="cards">
            {post.map((doc) => {
          return (
              <div onClick={()=>{
                setdetail(doc)
                navigate('/view')
              }} className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={doc.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {doc.price}</p>
                  <span className="kilometer">{doc.category}</span>
                  <p className="name"> {doc.name}</p>
                </div>
                <div className="date">
                  <span>{doc.createdate}</span>
                </div>
              </div>
              );
            })}
            </div>
          
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
