// import logo from '.s/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar/Navbar';
import ToastMessage from './components/ToastMessage/ToastMessage';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <AppRoutes/>
      <ToastMessage/>
    </div>
  );
}

export default App;
