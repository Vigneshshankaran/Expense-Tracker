const newTra = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        transactionsList: action.payload,
        message: "",
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactionsList: [action.payload, ...state.transactionsList],
        showMessage: true,
        message: "Transaction added successfully.",
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactionsList: state.transactionsList.filter(
          (transaction) => transaction._id !== action.payload
        ),
        showMessage: true,
        message: "Transaction deleted successfully.",
      };
    case "DISPLAY_ERROR_MSG":
      return {
        ...state,
        showMessage: true,
        message: action.payload,
      };
    case "RESET_ERROR_MSG":
      return {
        ...state,
        showMessage: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
export default newTra;