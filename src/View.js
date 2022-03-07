import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import './App.css';
import {db} from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

function View() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const history = useHistory();
  
  const createUser = async() => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge) }); 
  };

  const updateUser = async(id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    history.push('/');
  }

  useEffect (() => {
    
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //console.log(data);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getUsers()
  }, [])

  return (
    <div className="input_view"> 
      <div className="input_view">
        <input placeholder="Name..." onChange={(event) => {
          setNewName(event.target.value);
        }}/>

        <input type="number" placeholder="Age..." onChange={(event) => {
          setNewAge(event.target.value);
        }}/>
      
        <button onClick={createUser}>Create User</button>
      </div>
      {users.map((user) => {
        return(
          <div className='content'>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1 id='age'>Age: {user.age}</h1>
            <br />
            <button onClick={() => {
                  updateUser(user.id, user.age);
                }}
                >{" "}
                Increase age
            </button>
            &nbsp;
            <button onClick={() => {deleteUser(user.id)}}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default View;
