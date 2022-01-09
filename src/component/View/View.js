import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../store/Context";
import { Viewcontext } from "../../store/Viewcontext";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { Firebase } from "../../firebase/configure";

import "./View.css";
function View() {
  const [userdetail, setuserdetail] = useState();
  const { detail,setdetail } = useContext(Viewcontext);
  const { Firebase } = useContext(AppContext);
  const db = getFirestore(Firebase);

  useEffect(async () => {
      console.log(detail);
      const { userId } =detail;
      const userRef = collection(db, "user")
      const q = query(userRef, where("id", "==",  userId));
  // console.log(userId);
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot?.forEach((doc) => {
        // console.log(doc);
        setuserdetail(doc.data());
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        // console.log(setuserdetail);
      });
  });
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={detail?.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {detail?.price} </p>
          <span>{detail?.name}</span>
          <p>{detail?.category}</p>
          <span>{detail?.createdate}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userdetail?.userName}</p>
          <p>{userdetail?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
