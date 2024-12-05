import React from 'react';

export default function NoteItem(props) {
    // console.log(props);
    const { title, description, tag } = props.note;
    const handleOnUpdate = () => {
        props.setCurrentNote(props.note);
        props.editModalRef.current.click();
    }
    const handleOnDelete = () => {
        props.setCurrentNote(props.note);
        props.deleteModalRef.current.click();
    }
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{tag}</h6>
                    <p className="card-text">{description}</p>
                    <div className="action-wrap">
                        <i className="fa-solid fa-pen-to-square" onClick={handleOnUpdate}>&nbsp;</i>
                        <i className="fa-solid fa-trash-can" onClick={handleOnDelete}>&nbsp;</i>
                    </div>
                </div>
            </div>
        </div>
    )
}