import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { TransactionsListContext } from "../context/TransactionsListContext";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Grid from "@material-ui/core/Grid";
import CustomPieChart from "./CustomPieChart";
import Paper from "@material-ui/core/Paper";

function Stats() {
  const { transactionsList } = useContext(TransactionsListContext);
  const [currDate, setCurrDate] = useState(new Date().toISOString());

  //calculate category wise total for each category for both income and expense
  const incomeCategorywiseTotal = {};
  const expenseCategorywiseTotal = {};

  transactionsList
    .filter((transaction) => {
      return (
        new Date(transaction.date).getMonth() ===
          new Date(currDate).getMonth() &&
        new Date(transaction.date).getFullYear() ===
          new Date(currDate).getFullYear()
      );
    })
    .forEach((transaction) => {
      if (transaction.type === "income") {
        if (incomeCategorywiseTotal[transaction.category]) {
          incomeCategorywiseTotal[transaction.category] += Number(
            transaction.amount
          );
        } else {
          incomeCategorywiseTotal[transaction.category] = Number(
            transaction.amount
          );
        }
      } else {
        if (expenseCategorywiseTotal[transaction.category]) {
          expenseCategorywiseTotal[transaction.category] += Number(
            transaction.amount
          );
        } else {
          expenseCategorywiseTotal[transaction.category] = Number(
            transaction.amount
          );
        }
      }
    });

  //data array for income pie chart
  const incomeChartData = Object.keys(incomeCategorywiseTotal).map(
    (category) => {
      return {
        category: category,
        amount: incomeCategorywiseTotal[category],
      };
    }
  );

  //data array for expense pie chart
  const expenseChartData = Object.keys(expenseCategorywiseTotal).map(
    (category) => {
      return {
        category: category,
        amount: expenseCategorywiseTotal[category],
      };
    }
  );

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

  return (
    <div>
      <Navbar />
      <div className="container-stats">
        <div className="month-changer">
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

        {/* pie charts for displaying data */}
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-evenly"
        >
          <Grid item xs={12} md={6}>
            <Paper>
              <p className="stats-title">Income Stats</p>
              {incomeChartData.length === 0 && (
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
              <CustomPieChart chartData={incomeChartData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <p className="stats-title">Expense Stats</p>
              {expenseChartData.length === 0 && (
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
              <CustomPieChart chartData={expenseChartData} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Stats;
