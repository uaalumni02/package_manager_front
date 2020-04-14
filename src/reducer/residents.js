const residentReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_RESIDENTS":
      return { residents: action.payload, state };
    case "MODAL":
      return {
        ...state,
        modal: !state.modal,
      };
    default:
      throw new Error();
  }
};

export default residentReducer;
