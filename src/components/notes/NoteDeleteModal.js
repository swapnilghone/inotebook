import React, { useContext, useRef } from 'react';
import NoteContext from '../../context/notes/NoteContext';

const NoteDeleteModal = (props) => {
    const closeRef = useRef(null);
    const {deleteNote} = useContext(NoteContext);
    const handleDeleteNote = () => {
        deleteNote(props.currentNote._id);
        closeRef.current.click();
    }
    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeRef}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete Note?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleDeleteNote}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDeleteModal
