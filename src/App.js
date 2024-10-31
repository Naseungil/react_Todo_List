import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useCallback, useEffect, useState } from 'react';
import Todo from './Todo';
import Button from 'react-bootstrap/Button';



function App() {
  /*
  로컬 스토리지에 데이터 쓰기
  window.localStorage.setItem('name', '홍길동');

  로컬 스트리지에 데이터 읽기
  let test = window.localStorage.getItem('name')
  console.log(test)

  로컬 스트리지에 데이터 삭제
  window.localStorage.removeItem('name');


 let obj = {id : 1, text:'learn web'};
 console.log(obj)

 //객체 -> JSON 문자열 JSON.stringify(대상)
 let objString =  JSON.stringify(obj)
 console.log(objString)

 //로컬스토리지에는 문자열만 쓰기 가능
 window.localStorage.setItem('todo', objString);

 let test = window.localStorage.getItem('todo');

  //JSON 문자열 -> 객체 JSON.parse(대상)
  let testObj = JSON.parse(test);
  console.log(testObj);
  */

  const [todo, setTodo] = useState([]);
  const [todoId,setTodoId] = useState(0);
  console.log(todoId);
 

  //로컬스토리지에서 todo key에 값이 있으면 조회->todo에 목록 저장


/*
  let obj = [{id : 1, text:'learn web'}];
  let objString =  JSON.stringify(obj)
  let test = window.localStorage.setItem('todo',objString);
*/

  let getTodoList = useCallback(()=>{
    console.log('getTodoList 실행')
    const todoStringFromLocalStorege = window.localStorage.getItem('todo');
    if(todoStringFromLocalStorege !== null && todoStringFromLocalStorege !== '[]'){ //값이 있으면
      //JSON 문자열 -> 객체 JSON.parse(대상)
      const todoOjb = JSON.parse(todoStringFromLocalStorege);
      setTodo(todoOjb);
      setTodoId(todoOjb[todoOjb.length-1].id);
    }  
  },[]); //useCallback 함수로 getTodoList 함수의 결과 변경되었는지 여부 알려준다.

  let updateTodoId = useCallback(()=>{
    console.log('updateTodoId 실행');
    if(todo.length > 0){
      setTodoId(todo[todo.length-1].id);
    }else{
      setTodoId(0);
    }

  },[todo]);

/*
  let setStorage = useCallback(()=>{
    console.log('setStorage 실행')

    let todoString =  JSON.stringify(todo)
    window.localStorage.setItem('todo',todoString);
  },[todo]); //최초 한번 실행, todo가 변경되면 실행
*/

  let setStorage =()=>{
    console.log('setStorage 실행')

    let todoString =  JSON.stringify(todo)
    window.localStorage.setItem('todo',todoString);
  }

   useEffect(()=>{
    getTodoList();

   },[getTodoList]) //최초 한번 실행, getTodoList객체의 값이 변경되면 getTodoList 실행

  useEffect(()=>{
    setStorage();

  },[todo]) //최초 한번 실행

  useEffect(()=>{
    updateTodoId();

  },[todo,updateTodoId]) //todo, updateTodoId 변경되면 todoId를 업데이트 한다

  let addTodo=(value)=>{
    console.log('addTodo 실행')
    let newTodos = [...todo];
    let newId = todoId + 1;
    setTodoId(newId);
    newTodos.push({id:newId, text:value, checked:false})
    setTodo(newTodos);
    document.querySelector('#todo').value='';
  }

  let checkUpdate = (id,value)=>{
    console.log('todoUpdate 실행')

    let newTodos = todo.map(item => item.id === id ? {...item, checked:value} : item);
    
    setTodo(newTodos);
  }

  let deleteTodo = (id)=>{
    console.log('deleteTodo 실행')
    let newTodos = [...todo];
    let idx = newTodos.findIndex(item => item.id === id );
    newTodos.splice(idx,1);
    setTodo(newTodos);
    console.log(todoId);
  }

  let updateTodo =(id,text)=>{
    let newTodos = todo.map(item => item.id === id ? {...item, text:text} : item);    
    setTodo(newTodos);
  }


  let todos = todo.map((item,idx) => 
  < Todo data={item} key={idx} updateTodo={updateTodo} checkUpdate={checkUpdate} deleteTodo={deleteTodo}/>
)


  return (
    <div className="container">
      <h1>TO do list</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
      
        addTodo(e.target.todo.value);
      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할일 입력</Form.Label>
          <Form.Control type="text" placeholder="할일을 입력하세요" name="todo" />
        </Form.Group>
        <Button type="submit" variant="primary">입력</Button>
      </Form>
      <hr/>
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;
