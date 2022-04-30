import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TransactionsListProvider } from "../context/TransactionsListContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "true" ? (
          <TransactionsListProvider>
            <Component {...props} />
          </TransactionsListProvider>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
