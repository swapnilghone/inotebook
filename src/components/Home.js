import React from 'react';
import NotesList from './notes/NotesList';
import NoteAddForm from './notes/NoteAddForm';

export default function Home() {
  return (
    <>
        <NoteAddForm />
        <NotesList />
    </>
  )
}
