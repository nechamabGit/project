// import './App.css';
import Login from './components/Login'
import LogOut from './components/logOut';
import './index.css';
import './flags.css';
// import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeManager from './components/HomeManager';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from "react-router";
import Register from './components/Register';
import ViewDelivers from './components/delivers/ViewDelivers'
import ViewMachines from './components/machines/ViewMachines';
import Machine from './components/machines/Machine';
import MachineSending from './components/machineSending/MachineSending';
import { useDispatch, useSelector } from 'react-redux';
import HomeDeliver from './components/HomeDeliver';
function App() {
  const { token,role } = useSelector((state) => state.token);

  return (
    <div >         
       <Routes>        
          <Route path="/" element={<Login/>} /></Routes>

     {role=="manager"? <HomeManager/>:role=="deliver"?<HomeDeliver/>:<></>} 
      <Routes>
              <Route path="/components/HomeManager" element={<HomeManager />} />
              <Route path="/delivers/ViewDelivers" element={<ViewDelivers/>} />
              <Route path="/Machines/Machine" element={<Machine/>} />
              <Route path="/machineSending/MachineSending" element={<MachineSending/>} />
              <Route path="/logOut" element={<LogOut/>} />
              <Route path="/components/delivers/deliver" element={<deliver/>} />
              <Route path="/login" element={<Login/>} />

              {/* <Route path="/components/Register" element={<Register />} /> */}
      </Routes>
    </div>
  );
}

export default App;
