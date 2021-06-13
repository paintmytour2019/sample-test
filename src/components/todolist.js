import axios from 'axios'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'


const TodoList = () => {
  const [todoslist, setTodosList] = useState([])
  const [deleteCount, setDeleteCount] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:4000/todos/')
      .then((res) => {
        setTodosList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [deleteCount])
  const LinkComponent =(props) => {
    return (
      <Link to={`/edit/${props.data.id}`}>{props.value}</Link>
    );
  }
  const DeletComponent =(props) => {
    return (
      <button type="button" className="btn btn-danger" onClick={()=>{        
        axios.delete('http://localhost:4000/todos/delete/'+props.data.id)
          .then((res) => {
            setDeleteCount(deleteCount+1)
          })
      }}>{props.value}</button>
    );
  }
  const createRowData = () => {  
      return todoslist.map(item=> ({        
          assigned:item.todo_responsible,
          description:item.todo_description,
          status:item.todo_status,
          id:item._id,
          action:'Edit',
          delete: 'Delete'
      }))
  }
  
const columnDefs = [
  {
    headerName: "Assigned",
    field: "assigned",
    editable: true
  },
  {
    headerName: "Description",
    field: "description",
    editable: true
  },
  {
    headerName: "Status",
    field: "status",
    editable: true
  },
  {    
    headerName: 'Update',
    field: 'action',
    cellRenderer: 'LinkComponent'
  },
  {    
    headerName: 'Delete',
    field: 'delete',
    cellRenderer: 'DeletComponent'
  },
]
  return(
    <div>
      <h3>Project Management</h3>
      <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
           <AgGridReact
               rowData={createRowData()}
               columnDefs={columnDefs}
               frameworkComponents={{
                LinkComponent,
                DeletComponent
              }}>               
           </AgGridReact>
       </div>
    </div>
    
  )
}

export default TodoList