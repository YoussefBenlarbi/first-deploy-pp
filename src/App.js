import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home1';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
function App() {
	return (
    <BrowserRouter>
		<div className="App">
			<ToastContainer position="top-center" />
			<Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addStagiaire' element={<AddEdit/>}/>
        <Route path='/update/:id' element={<AddEdit/>}/>
        <Route path='/view/:id' element={<View/>}/>
      </Routes>
		</div>
    </BrowserRouter>
	);
}

export default App;
