import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Todos from './Todos';
import React, { useState , useEffect } from 'react';
import AddTodo from './AddTodo';
import About from './About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let initTodo; 
  if(localStorage.getItem("todos")===null){
    initTodo= [];
  }
  else{
    initTodo= JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete =(todo)=>{
    console.log("I am onDelete of todo", todo );
    //not working
    //let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    setTodos(todos.filter((e)=>{
      return e!==todo;

    }))
   localStorage.setItem("todos",JSON.stringify(todos));
   
  }  
   const addTodo = ( title, desc)=>{
      console.log("I am Adding this Todo", title, desc)
      let sno;
      if (todos.length===0) { 
        sno = 1;
      }
      else{
        sno = todos[todos.length-1].sno + 1;
      }
      
      const myTodo  ={
        sno: sno,
        title: title,
        desc: desc,
      }
      setTodos([...todos, myTodo]);
      console.log(myTodo);
     
    }
 const [todos, setTodos] = useState(initTodo);
 useEffect (() => {
  localStorage.setItem("todos", JSON.stringify(todos));
 },[todos])
  return (
    <>
    <Router>
    <Header title= "My Todo List" searchBar={false}/>
    <Switch>
      <Route exact path="/" render={() => {
        return (
        <>
        <AddTodo addTodo= {addTodo}/>
    <Todos todos={todos} onDelete={onDelete}/>
    </>)
      }}>
            
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
    <Footer/>
    </Router>
    </>
  );
}
export default App;
