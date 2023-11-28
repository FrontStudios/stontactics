import { configureStore } from '@reduxjs/toolkit';

import matchPartsSlice from './matchPartsSlice/matchPartsSlice';

const store = configureStore({
  reducer: {
    matches: matchPartsSlice,
  },
});

export default store;