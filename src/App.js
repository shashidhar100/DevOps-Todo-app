import logo from './logo.svg';
import './App.css';
import CreateForm from './From';
import TaskList from './TaskList';
import { useState } from 'react';



function App() {

  const [taskList, setTaskList] = useState([]);

  function updateTaskList(obj) {
    setTaskList(taskList => [...taskList,obj])
  }

  function deleteTask(index) {
    setTaskList([...taskList.slice(0,index),...taskList.slice(index+1,taskList.length)])
    
  }

  console.log(taskList,"current task list")


  return (
    <><CreateForm updateTaskList={updateTaskList} /><TaskList taskList={taskList} handleDelete={deleteTask} /></>
    
  );
}

export default App;
