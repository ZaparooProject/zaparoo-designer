import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useWindowPaste } from './hooks/useWindowPaste';
import { Header } from './components/Header';
import { Header as HeaderV2 } from './componentsV2/Header';
import { HomePage } from './components/HomePage';

import './App.css';
import { useFileDropperContext } from './contexts/fileDropper';

const LabelsView = lazy(() => import('./components/LabelsView'));
const LabelsViewV2 = lazy(() => import('./componentsV2/LabelsView'));

function App() {
  useWindowPaste();
  const { files } = useFileDropperContext();

  const hasFiles = files.length > 0;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              {!hasFiles && <HomePage />}
              {hasFiles && (
                <Suspense fallback={null}>
                  <LabelsView />
                </Suspense>
              )}
            </>
          }
        />
        <Route
          path="/editor"
          element={
            <>
              <HeaderV2 />
              <Suspense fallback={null}>
                <LabelsViewV2 />
              </Suspense>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
