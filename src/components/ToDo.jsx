import { useRef, useState, useEffect } from "react";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const ToDo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    let inputRef = useRef(null);
    const [showFinished, setShowFinished] = useState(false);

    // Save todos to local storage
    const saveToLS = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // Load todos from local storage on component mount
    useEffect(() => {
        let todoString = localStorage.getItem("todos");
        if (todoString) {
            let todos = JSON.parse(todoString);
            setTodos(todos);
        }
    }, []);

    // Handle adding a new todo
    const handleAdd = (e) => {
        e.preventDefault();
        inputRef.current.focus();
        if (todo.trim() !== "") { // Add the new todo to the todos array
            const newTodo = { id: uuidv4(), todo, isCompleted: false };
            const updatedTodos = [newTodo, ...todos];
            setTodos(updatedTodos);
            setTodo("");  // Clear the input after adding
            saveToLS(updatedTodos);   // Immediately save the updated todos to local storage
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    // Handle checkbox change (mark todo as completed or not)
    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => item.id === id);
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLS(newTodos); // Instantly save to local storage after changing completion status
    };

    // Handle editing a todo
    const handleEdit = (e, id) => {
        let todoToEdit = todos.filter(item => item.id === id);
        setTodo(todoToEdit[0].todo);

        let newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos); // Save updated todos after editing
    };

    // Handle deleting a todo
    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos); // Save updated todos after deletion
    };

    // Toggle showing finished todos
    const Finished = () => {
        setShowFinished(!showFinished);
    };

    // Filter todos based on completion status
    const filteredTodos = showFinished
        ? todos.filter((item) => item.isCompleted)  // Show only completed todos
        : todos.filter((item) => !item.isCompleted);  // Show only unfinished todos

    return (
        <div>
            <div className="mx-auto relative top-24 z-1 lg:w-[40%] w-[90%] rounded-lg p-6 min-h-[75vh] flex flex-col text-left bg-violet-100 shadow-2xl">
                <div>
                    <h1 className='text-center text-2xl font-bold text-violet-700'>ToDo - Manage your daily task at one place</h1>
                    <h2 className='py-4 pt-8 font-bold text-xl text-violet-700'>Add a Todo</h2>
                    <form className='flex gap-3'>

                        {/* Input Todo */}
                        <input className="rounded-full w-[90%] focus:border-black border border-gray-300 focus:outline-none p-1 px-4" type="text" name="" id="" placeholder='Write a new Todo...' value={todo} onChange={handleChange} ref={inputRef} />

                        {/* Save button */}
                        <button className='bg-purple-700 rounded-full px-3 py-1 text-white' type='submit' onClick={handleAdd}>Save</button>
                    </form>

                    <div className='text-sm gap-2 flex pt-6 pb-2'>
                        {/* Finished todo */}
                        <input className="hover:cursor-pointer" type="checkbox" value={showFinished} onChange={Finished} checked={showFinished} />
                        <label htmlFor="">Show Finished</label>
                    </div>
                    <div className='bg-gray-500 h-[0.05rem] my-2 min-w-full'></div>

                    {/* Main Todos List */}
                    <div>
                        <h2 className='font-bold text-xl text-violet-700 mb-2 mt-1'>Your Todos</h2>
                        <div className="overflow-scroll h-96">

                            {filteredTodos.length === 0 && <div className="mt-2">No Todos...</div>}

                            {filteredTodos.map(item => (
                                <div key={item.id} className='todo flex p-3 mt-2 justify-between rounded-md bg-violet-200 text-violet-700 items-center'>
                                    <div className='flex gap-2 relative items-center overflow-x-scroll'>
                                        <div>
                                            <input type="checkbox" className="hover:cursor-pointer" id='todocheck' name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                                        </div>

                                        {/* Added Todo */}
                                        <div className={`relative overflow-x-scroll mr-2 ${item.isCompleted ? "line-through" : ""}`}>
                                            {item.todo}
                                        </div>
                                    </div>
                                    <div className='button flex gap-2'>

                                        {/* Edit button */}
                                        <button className='bg-violet-600 hover:bg-violet-800 p-1 rounded-md' onClick={(e) => { handleEdit(e, item.id) }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='white' viewBox="0 0 24 24"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg>
                                        </button>

                                        {/* Delete button */}
                                        <button className='bg-violet-600 hover:bg-violet-800 p-1 rounded-md' onClick={(e) => { handleDelete(e, item.id) }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='white' viewBox="0 0 24 24"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;

