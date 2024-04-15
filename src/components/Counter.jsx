import { applyMiddleware, createStore } from 'redux';
import { useState } from 'react';
import reducer from './Reducer';
import { fetchUserData, showError } from './Actions';
import axios from 'axios';
import {thunk}  from 'redux-thunk';


const store = createStore(reducer,applyMiddleware(thunk))

function fetchData(){
  return function(){
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res=>{
      const users = res.data;
      store.dispatch(fetchUserData(users))
    })
    .catch(error=>{
      store.dispatch(showError(error.message))
    })
}}


export default function Counter() {

  const [data, setData] = useState([]);

  const unsubscribe = store.subscribe(()=>{
    setData(store.getState().users)
  })  

  return (
    <div>
      {data.map(ele=>{
        return <div key={ele.id}>
          <div>
            <h3>{ele.name}</h3>
            <h4>{ele.email}</h4>
          </div>
          <hr></hr>
        </div>
      })}
      <button onClick={store.dispatch(fetchData)}>Fetch Data</button>
  </div>
  )
}