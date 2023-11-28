import { Routes, Route, useNavigate } from 'react-router-dom'

import Main from '../main/Main';
import Page from '../page/Page';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/strategy")
  }, [])

  return (
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Page />}>
          <Route path="/strategy" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
