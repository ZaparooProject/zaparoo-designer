import { Routes, Route } from 'react-router-dom';
import { useWindowPaste } from './hooks/useWindowPaste';
import { Header as HeaderV2 } from './componentsV2/Header';
import LabelsViewV2 from './componentsV2/LabelsView';

import './App.css';

function App() {
  useWindowPaste();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderV2 />
              <LabelsViewV2 />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
