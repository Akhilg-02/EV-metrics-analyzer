import './App.css';
import Dashboard from './Components/Dashboard';
import { EvDataProvider } from './Context/EVDataContext';

function App() {
  return (
    <>
     <EvDataProvider>
      <Dashboard/>
     </EvDataProvider>
    </>
  );
}

export default App;
