import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import AlertState from "./context/Alter/AlertState";
import MyAccount from "./components/user/MyAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <AlertState>
          <NoteState>
            <main className="d-flex flex-column h-100">
              <div className="warp flex-shrink-0">
                <Header />
                <Alert />
                <div className="container my-5">
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/addnote' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/my-account' element={<MyAccount />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </main>
          </NoteState>
        </AlertState>
      </BrowserRouter>
    </>
  );
}

export default App;
