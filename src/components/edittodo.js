import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const EditTodo = (props) => {
  const [responsible, setResponsible] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Open') 
  let history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:4000/todos/'+props.match.params.id)
      .then((res) => {
        setResponsible(res.data.todo_responsible)
        setDescription(res.data.todo_description)
        setStatus(res.data.todo_status)
      })
  }, [props.match.params.id])
  /**
   * function name- submitTodo
   * param-
   * retun-
   */
  const updateTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      todo_responsible: responsible,
      todo_description: description,
      todo_status: status
    }
    axios.post('http://localhost:4000/todos/update/'+props.match.params.id, newTodo)
      .then((res, err)=>{
        console.log(res.data)
        history.push("/");
      })
    setResponsible('')
    setDescription('')
    setStatus('Open') 
  }
  /**
   * function name- onChangeResponsible
   * param- event object
   * purpose- To update responsible name
   */
  const onChangeResponsible = (e) => {
    setResponsible(e.target.value)
  }

  /**
   * function name- onChangeDescription
   * param- event object
   * purpose- To update decription of to do
   */
  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  /**
   * function name- onChangeStatus
   * param- event object
   * purpose- To update status of to do
   */
  const onChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  return(
    <div style= {{marginTop: 10}}>
      <h3>Create Todo </h3>
      <form onSubmit={updateTodo}>
        <div className='form-group'>
          <label>Developer: </label>
          <input type='text'
                 className='form-control'
                 value={responsible}
                 onChange={onChangeResponsible}
          >
          </input>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input type='text'
                 className='form-control'
                 value={description}
                 onChange={onChangeDescription}
          >
          </input>
        </div>
        <div className='form-group'>
          <label>Status: </label>
          <select value={status} onChange={onChangeStatus}>
            <option value='Open'>Open</option>
            <option value='Inprogress'>Inprogress</option>
            <option value='Complete'>Complete</option>
          </select>
        </div>
        <div className='form-group'>
          <input type='submit' value='Update Todo' className='btn btn-primary'/>
        </div>
      </form>
    </div>
  )
}

export default EditTodo