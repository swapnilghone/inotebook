import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import AlertContext from "../Alter/AlertContext";

const NoteState = (props) => {

    const { showAlert } = useContext(AlertContext);

    const [notes,setNote] = useState([]);
    const APIURL = process.env.REACT_APP_API_URL;

    const authToken = localStorage.getItem('authToken');

    // Get all notes
    const getAllNotes = async () => {
      const resp = await fetch(`${APIURL}notes`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' ,'auth-token':authToken}
      });

      const respNotes = await resp.json();
      setNote(respNotes);
    }

    // Add new note
    const addNote = async (note) => {
        const resp = await fetch(`${APIURL}notes`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,'auth-token':authToken},
          body:  JSON.stringify(note)
        });

        const newNote = await resp.json();

        setNote(notes.concat(newNote));
        showAlert('note added sucessfully!','success');
    }

    // edit Note
    const editNote = async (noteId,data) => {

      await fetch(`${APIURL}notes/${noteId}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,'auth-token':authToken},
        body:  JSON.stringify(data)
      });
      let newNotes = [];
      notes.forEach((note,index) => {
          if(note._id === noteId){
            newNotes[index] = {...note,...data};
          }else{
            newNotes[index] = note;
          }
      });
      setNote(newNotes);
      showAlert('note updated sucessfully!','success');
    }

    const deleteNote = async (noteId) => {

      await fetch(`${APIURL}notes/${noteId}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' ,'auth-token':authToken}
      });

      console.log('deleting note with it',noteId);
      const newNotes = notes.filter((note) =>{
          return note._id !== noteId;
      });

      setNote(newNotes);
      showAlert('note deleted sucessfully!','success');
    }

    return (
        <NoteContext.Provider value={{notes,getAllNotes,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;