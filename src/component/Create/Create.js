import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore/lite";
import { AppContext, LogContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  
  const { Firebase } = useContext(AppContext);
  const { user } = useContext(LogContext);
  const db = getFirestore(Firebase);
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState(null);
  const date = new Date();
  const navigate = useNavigate()

  const handleSubmit = () => {
    const storage = getStorage();
    // console.log(image);
    try {
      const storageRef = ref(storage, `/image/${image.name}`);

      uploadBytes(storageRef, image).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          const prductsCollection = collection(db, "products");
          addDoc(prductsCollection, {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdate: date.toDateString(),
          });
          navigate('/')

        });
      });
    } catch (error) {
      console.log(error);
    }

    //     const storage = getStorage();
    // const imagesRef = ref(storage,`/image/${image.name}`)
    // const spaceRef = ref(storage, 'images/space.jpg')
    // .then(({ref})=>{getDownloadURL().then((url) =>{
    // console.log(url);
    // }

    // )})
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              id="fname"
              name="Price"
            />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="uploadBtn"
          >
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
