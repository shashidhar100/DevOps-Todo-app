import logo from './logo.svg';
import './App.css';
import CreateForm from './From';
import TaskList from './TaskList';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';


function Header() {
  return <Container>
    <Row className='col-md-2 col-md-offset-8 align-center'>
    <h1>
To Do 
</h1>
    </Row>
    
  </Container>
}

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
    <><Header/><CreateForm updateTaskList={updateTaskList} /><TaskList taskList={taskList} handleDelete={deleteTask} /></>
    
  );
}

export default App;
