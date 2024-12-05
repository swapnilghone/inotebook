import React,{useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function About() {
    const a = useContext(NoteContext);
    useEffect(() => {
        a.update();
    },[]);
  return (
    <div>
      About US
      Note Title: {a.note.title}<br/>
      Note Desc: {a.note.description}<br/>
    </div>
  )
}