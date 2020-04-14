const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value
    };
  };

// import store from '../store/store';
// import { useReducer } from 'react';

// const packageReducer = (state, action) => {
//   switch(action.type) {
//     case 'GET_PACKAGE':
//     return [...state, action.payload]
      // case 'GET_PACKAGES':
      //   return [...state, ...action.payload]
//   }
// }


// const [state, dispatch] = useReducer(store.allPackages, packageReducer)

// fetchData(response) {
//   dispatch({ type: 'GET_PACKAGES', payload: response.data })
// }
  export default reducer