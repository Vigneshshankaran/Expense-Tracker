import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import AddTransaction from "./AddTransaction";
import TransactionCard from "./TransactionCard";
import Balance from "./Balance";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Grid from "@material-ui/core/Grid";
//below imports for making website design responsive
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

//importing global contexts
import { TransactionsListContext } from "../context/TransactionsListContext";

function Dashboard() {
  const {
    transactionsList,
    getTransactions,
    addTransaction,
    deleteTransaction,
    showMessage,
    message,
    resetShowMessage,
  } = useContext(TransactionsListContext);
  console.log("rendered");

  //declaring state for managing the transactions list
  //const [transactionsList, setTransactionsList] = useState([]);
  const [currDate, setCurrDate] = useState(new Date().toISOString());
  const [balance, setBalance] = useState({
    income: Number(0),
    expense: Number(0),
  });
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  //fetching all stored transactions from the backend ( add auth token to request )
  useEffect(() => {
    getTransactions();
  }, []);

  //months array to display month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //function to go to prev month for prev button
  function handlePrev() {
    setCurrDate((prevState) => {
      const d = new Date(prevState);
      d.setMonth(d.getMonth() - 1);
      return d.toISOString();
    });
  }

  //function to go to next month for next button
  function handleNext() {
    setCurrDate((prevState) => {
      const d = new Date(prevState);
      d.setMonth(d.getMonth() + 1);
      return d.toISOString();
    });
  }

  //change balance state whenever month changes
  useEffect(() => {
    changeBalance();
  }, [currDate, transactionsList]);

  //function for changing balance
  function changeBalance() {
    let monthlyExpense = Number(0),
      monthlyIncome = Number(0);

    for (let i = 0; i < transactionsList.length; i++) {
      if (
        new Date(transactionsList[i].date).getMonth() ===
          new Date(currDate).getMonth() &&
        new Date(transactionsList[i].date).getFullYear() ===
          new Date(currDate).getFullYear()
      ) {
        if (transactionsList[i].type === "expense") {
          monthlyExpense += Number(transactionsList[i].amount);
        } else {
          monthlyIncome += Number(transactionsList[i].amount);
        }
      }
    }

    setBalance({
      income: monthlyIncome,
      expense: monthlyExpense,
    });
  }

  //for mobile devices
  const [openAddForm, setOpenAddForm] = useState(false);
  //const [showSuccess, setShowSuccess] = useState(showMessage);

  function handleAddIconClick() {
    setOpenAddForm(true);
  }

  function handleClose() {
    setOpenAddForm(false);
  }

  if (isAuthenticated === "false") {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="container-dashboard">
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="space-evenly"
        >
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <AddTransaction
                addTransaction={addTransaction}
                handleFormClose={() => {}}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <div className="recent-transactions">
              {/* <p>Recent Transactions</p> */}
              <div className="recent-transactions-header">
                <IconButton onClick={handlePrev}>
                  <NavigateBeforeIcon />
                </IconButton>
                <p>
                  {months[new Date(currDate).getMonth()]}{" "}
                  {new Date(currDate).getFullYear()}
                </p>
                <IconButton onClick={handleNext}>
                  <NavigateNextIcon />
                </IconButton>
              </div>
              <Hidden mdUp>
                <Balance balance={balance} />
              </Hidden>
              {/* display no data icon if no transactions are available */}
              {balance.income === 0 && balance.expense === 0 && (
                <div className="no-data">
                  <img
                    className="no-data-image"
                    src={"/images/icons/error.png"}
                    width="100px"
                    height="100px"
                    alt="no data"
                  />
                  <p>No Data Available.</p>
                </div>
              )}
              {/* get transactions according to month */}
              {transactionsList
                .filter((transaction) => {
                  return (
                    new Date(transaction.date).getMonth() ===
                      new Date(currDate).getMonth() &&
                    new Date(transaction.date).getFullYear() ===
                      new Date(currDate).getFullYear()
                  );
                })
                .sort((a, b) => {
                  return (
                    new Date(b.date).getDate() - new Date(a.date).getDate()
                  );
                })
                .map((transaction) => {
                  return (
                    <TransactionCard
                      key={transaction._id}
                      transaction={transaction}
                      deleteTransaction={deleteTransaction}
                    />
                  );
                })}
            </div>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} md={2}>
              <Balance balance={balance} />
            </Grid>
          </Hidden>
        </Grid>
        {/*for mobile devices*/}
        <Hidden mdUp>
          <Fab
            color="primary"
            style={{ position: "fixed", right: "30px", bottom: "30px" }}
            onClick={handleAddIconClick}
          >
            <AddIcon />
          </Fab>
          {/* add transaction pop up for add icon */}
          <Dialog open={openAddForm} onClose={handleClose}>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogContent>
              <AddTransaction
                addTransaction={addTransaction}
                handleFormClose={handleClose}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Hidden>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={showMessage}
          onClose={() => resetShowMessage()}
          message={message}
          autoHideDuration={3000}
        />
      </div>
    </div>
  );
}

export default Dashboard;
