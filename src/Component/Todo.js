import React,{useEffect, useState} from 'react'
import todo from '../Images/Todo.png'
//to get the data from local storage
const getData=()=>{
     let list=localStorage.getItem('Lists');
     console.log(list)
     if(list){
        return JSON.parse(localStorage.getItem('Lists'));
     }
     else{
         return[]
     }
}
function Todo(){
    const[inputData,setInputData]=useState('');
    const[items,setItems]=useState(getData());
    const[toggleSubmit,setToggleSubmit]=useState(true);
    const[isEditItem,setIsEditItem]=useState(null);
    const addItems=()=>{
         if(!inputData){
             alert("Please Fill The Field")
         }
         else if(!toggleSubmit&&inputData){
                setItems(
                    items.map((ele)=>{
                        if(ele.id===isEditItem){
                        return{...items,name:inputData}
                        }
                        return ele;
                    })
                  
                )
                setToggleSubmit(true);
                setInputData('');
                setIsEditItem(null);
         }
         else{
        const allData={id:new Date().getTime().toString(), name: inputData}
         setItems([...items,allData])
          setInputData('')
         }
    }
    //add data to localStorrage
    useEffect(()=>{
          localStorage.setItem("Lists",JSON.stringify(items))
    },[items])
     
    const deleteItem=(idx)=>{
        const newItem=items.filter((ele)=>{
               return ele.id!==idx
        })
        setItems(newItem);
    }
    const removeAll=()=>{
          setItems([])
    }
    //when the user click on edit button
    //1:get the id and name of the data which user clicked to edit
    //2:set the toggle mode to change the submit button into edit button
    //3:Now update the value of the setInput with the new updated value to edit.
    //4:To pass the current element Id to new State variable for reference
    const editItem=(idx)=>{
          let newItem=items.find((ele)=>{
               return ele.id===idx
          })
          setToggleSubmit(false);
          setInputData(newItem.name);
          setIsEditItem(idx);
    }
    return(
          <>
          <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src={todo} alt="todologo"/>
                    <figcaption>Add Your List Here ✌</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder=' ✍ add Items...' onChange={(e)=>setInputData(e.target.value)}  value={inputData}/>
                    {
                     toggleSubmit?<i className="fa fa-plus add-btn" title='Add Items' onClick={addItems}></i>:<i className="fa-regular fa-pen-to-square add-btn" title='Update items' onClick={addItems}></i>
                    }
                    
                </div>
                <div className='showItems'>
                    {
                      items.map((ele)=>{
                         return(
                            <div className='eachItem' key={ele.id}>
                            <h3>{ele.name}</h3>
                            <div className='todo-btn'>
                            <i className="fa-regular fa-pen-to-square add-btn" title='Edit Items' onClick={() =>editItem(ele.id)}></i>
                            <i className="fa-regular fa-trash-can add-btn" title='Delete Items' onClick={()=>deleteItem(ele.id)}></i>
                            </div>
                           </div>
                         )
                      })
                    }
                 
                </div>
                <div className='showItems'>
                { items.length >=1 && <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button> }
                </div>
                
            </div>
          </div>
          </>
    )
}
export default Todo;