import { createContext, useReducer } from "react";
import TransactionsListReducer from "./TransactionsListReducer";

//initial State
const initialState = {
  transactionsList: [],
  showMessage: false,
  message: "",
};

export const TransactionsListContext = createContext(initialState);

//provider component
export const TransactionsListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionsListReducer, initialState);

  //actions
  async function getTransactions() {
    const response = await fetch("http://localhost:8080/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });

    const data = await response.json();

    if (data.success === true) {
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: data.data,
      });
    } else {
      // console.log(data.message);
      if (data.error === "jwt malformed") {
        localStorage.setItem("isAuthenticated", false);
      }
      dispatch({
        type: "DISPLAY_ERROR_MSG",
        payload: data.error,
      });
    }
  }

  async function addTransaction(transactionObj) {
    const response = await fetch("http://localhost:8080/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        detail: transactionObj.detail,
        amount: transactionObj.amount,
        date: transactionObj.date,
        type: transactionObj.type,
        category: transactionObj.category,
      }),
    });

    const data = await response.json();

    if (data.success === true) {
      transactionObj._id = data.data._id;

      dispatch({
        type: "ADD_TRANSACTION",
        payload: transactionObj,
      });
    } else {
      //console.log(data.message);
      if (data.error === "jwt malformed") {
        localStorage.setItem("isAuthenticated", false);
      }
      dispatch({
        type: "DISPLAY_ERROR_MSG",
        payload: data.error,
      });
    }
  }

  async function deleteTransaction(transactionId) {
    const response = await fetch("http://localhost:8080/api/transactions/" + transactionId, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("authToken"),
      },
    });

    const data = await response.json();

    if (data.success === true) {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: transactionId,
      });
    } else {
      // console.log(data.message);
      if (data.error === "jwt malformed") {
        localStorage.setItem("isAuthenticated", false);
      }
      dispatch({
        type: "DISPLAY_ERROR_MSG",
        payload: data.error,
      });
    }
  }

  function resetShowMessage() {
    dispatch({
      type: "RESET_ERROR_MSG",
      payload: "",
    });
  }

  return (
    <TransactionsListContext.Provider
      value={{
        transactionsList: state.transactionsList,
        showMessage: state.showMessage,
        message: state.message,
        getTransactions,
        addTransaction,
        deleteTransaction,
        resetShowMessage,
      }}
    >
      {children}
    </TransactionsListContext.Provider>
  );
};
