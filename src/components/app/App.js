import { Routes, Route } from 'react-router-dom'

import Main from '../main/Main';
import Page from '../page/Page';

const App = () => {
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
