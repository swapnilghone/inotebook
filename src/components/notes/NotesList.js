import React, { useContext, useEffect,useRef, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext';
import NoteItem from './NoteItem';
import NoteAddForm from './NoteAddForm';
import NoteEditForm from './NoteEditForm';
import NoteDeleteModal from './NoteDeleteModal';
import { useNavigate } from 'react-router-dom';

export default function NotesList() {
    const navigate = useNavigate();
    const { notes, getAllNotes } = useContext(NoteContext);
    
    const [currentNote,setCurrentNote] = useState({'_id':'','title':'','description':'','tag':''});

    const editModalRef = useRef(null);
    const deleteModalRef = useRef(null);

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            getAllNotes();
            
        }else{
            navigate('/login');
        }
        
        // eslint-disable-next-line
    },[]);

    return (
        <div className='row'>
            <div className="col-md-12">
                <div className="d-flex justify-content-between">
                    <h1>My Notes</h1>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#noteAddForm" >Add New Note</button>
                </div>
                <hr />
            </div>
            <div className="container">
            {(!notes || notes.length === 0 )&& 'No Notes Added yet!'}
            </div>
            {notes && notes.map((note) => {
                return <NoteItem key={note._id} note={note} editModalRef={editModalRef} deleteModalRef={deleteModalRef} setCurrentNote = {setCurrentNote}/>
            })}
            {/* <!-- Modal --> */}
            <NoteAddForm/>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#noteEditForm" ref={editModalRef} >Edit Note Trigger</button>
            <NoteEditForm currentNote={currentNote} setCurrentNote = {setCurrentNote}/>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal" ref={deleteModalRef}>Deleted Modal Trigger</button>
            <NoteDeleteModal currentNote={currentNote} setCurrentNote = {setCurrentNote} />
        </div>
    )
}