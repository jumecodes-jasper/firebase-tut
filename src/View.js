import { useState, useEffect } from 'react';
import './index.css';
import {db} from './firebase-config';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, QuerySnapshot} from "firebase/firestore";

function View() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id });
      //console.log(data); 
      //setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    });
    setUsers(todosArray);
  });
    return () => unsub();
  }, []);

  const createUser = async() => {
    const q = query(collection(db, "users"));
    await addDoc(q, {name: newName, age: Number(newAge) }); 
    // setUsers(oldAuthors => [...oldAuthors, newAuthor])
    //window.location.reload();
  };

  const updateUser = async(id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = {age: age + 1};
    await updateDoc(userDoc, newFields);
    // setUsers(oldAuthors => [...oldAuthors, newAuthor])
    //window.location.reload();
  };

  const deleteUser = async(id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    // setUsers(oldAuthors => [...oldAuthors, newAuthor])
    //window.location.reload();
  }

  return (
    <div className="details"> 
      <div className="input_view">
        <input placeholder="Name..." id='inp1' onChange={(e) => {
          setNewName(e.target.value);
        }}/>

        <input type="number" placeholder="Age..." onChange={(e) => {
          setNewAge(e.target.value);
        }}/>
      
        <button onClick={createUser}>Create User</button>
      </div>

      <div className="container">
        {users.map((user) => (
            <div className='content'>
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
        ))}
      </div>
    </div>
  );
}

export default View;
