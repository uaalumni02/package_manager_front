const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value
    };
  };

  export default reducer