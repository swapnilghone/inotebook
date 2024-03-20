import React, { useContext, useRef } from 'react';
import NoteContext from '../../context/notes/NoteContext';

export default function NoteEditForm(props) {

    const {currentNote,setCurrentNote} = props;
    const { _id, title, description, tag } = currentNote;
    const modalCloseRef = useRef(null);
    const { editNote } = useContext(NoteContext);

    const handleUpdateNote = (e) => {
        e.preventDefault();
        editNote(_id,{'title':title,'description':description,'tag':tag});
        modalCloseRef.current.click();
    }
    const handleOnChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    }

    return (

        <div className="modal fade" id="noteEditForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="noteEditFormLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="noteEditFormLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalCloseRef}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" name='title' className="form-control" onChange={handleOnChange} value={title} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" name='description' className="form-control" onChange={handleOnChange} value={description} />
                                {/* <textarea className='form-control' name='description' onChange={handleOnChange}/> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tags</label>
                                <input type='text' className='form-control' name='tag' onChange={handleOnChange} value={tag} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
