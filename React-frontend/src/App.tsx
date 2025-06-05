import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/HomePage';
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Homepage/>}></Route>
         <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
       </Routes>
       </BrowserRouter>
    </>
  );
}

export default App;
