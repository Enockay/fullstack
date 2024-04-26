import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const baseUrl = "http://localhost:3002/api/notes";

  const getData = async () => {
    try{
      const response = await axios.get(baseUrl);
      const fetchedData =  response.data;
      setData(response.data);
      console.log(response.data);
    }catch(error){
      setError(error);
    }
  };
  
  if(data){
    return(
      <>
  <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.content} {item.important ? "(Important)" : ""}
          </li>
        ))}
      </ul>
      </>
    )
  }
  return (
    <>
       <div className='greetings'>
         <button onClick={getData} >get data </button>
       
      <p className='error'>{error || "no data available"}</p>
       </div>
    </>
  )
}

export default App
