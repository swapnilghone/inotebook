import React, { useContext, useRef, useState } from 'react';
import NoteContext from '../../context/notes/NoteContext';

export default function NoteAddForm(props) {
    const modalCloseRef = useRef(null);
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({ 'title': '', 'description': '', 'tag': '' });

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note);
        modalCloseRef.current.click();
    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (

        <div className="modal fade" id="noteAddForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="noteAddFormLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="noteAddFormLabel">Add New Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalCloseRef}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" name='title' className="form-control" onChange={handleOnChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" name='description' className="form-control" onChange={handleOnChange} />
                                {/* <textarea className='form-control' name='description' onChange={handleOnChange}/> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tags</label>
                                <input type='text' className='form-control' name='tag' onChange={handleOnChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button disabled={note.description.length <=10} type="button" className="btn btn-primary" onClick={handleAddNote}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}