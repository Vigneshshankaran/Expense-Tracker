import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function AddTransaction(props) {
  //variable for setting default date to present day
  let dateObj = new Date();
  let currDate = dateObj.toISOString().slice(0, 10);

  //options for income and expense categories
  let expenseCategories = [
    "Food",
    "Commute",
    "Household",
    "Apparel",
    "Health",
    "Beauty",
    "Education",
    "Gift",
    "Other",
  ];
  let incomeCategories = [
    "Salary",
    "Allowance",
    "Business",
    "Interest",
    "Gift",
    "Other",
  ];

  //declare states
  //state for keeping track of user input for a new transaction
  const [inputTransaction, setInputTransaction] = useState({
    _id: "",
    detail: "",
    amount: "",
    date: currDate,
    type: "expense",
    category: "",
  });

  //state for setting helper text for input textfields
  const [helper, setHelper] = useState({
    detail: "",
    amount: "",
    type: "",
    category: "",
  });

  //state for changing category based on transaction type
  const [categoryArr, setCategoryArr] = useState(expenseCategories);

  //function for validating user input before making post request to api
  function isValid() {
    if (inputTransaction.detail === "") {
      setHelper((prev) => {
        return {
          ...prev,
          detail: "Enter transaction detail",
        };
      });
      return false;
    }

    if (inputTransaction.amount === "") {
      setHelper((prev) => {
        return {
          ...prev,
          amount: "Enter transaction amount",
        };
      });
      return false;
    }

    if (inputTransaction.type === "") {
      setHelper((prev) => {
        return {
          ...prev,
          type: "Select transaction type",
        };
      });
      return false;
    }

    if (inputTransaction.category === "") {
      setHelper((prev) => {
        return {
          ...prev,
          category: "Select a category",
        };
      });
      return false;
    }

    return true;
  }

  function handleInputChange(event) {
    const eventCallerName = event.target.name;
    const eventCallerValue = event.target.value;

    setInputTransaction((prevState) => {
      return {
        ...prevState,
        [eventCallerName]: eventCallerValue,
      };
    });

    if (eventCallerName === "type") {
      setCategoryArr(
        eventCallerValue === "expense" ? expenseCategories : incomeCategories
      );
    }
  }

  return (
    <div className="add-wrapper">
      <form id="add" autoComplete="off">
        <FormControl>
          {/* <FormLabel>Type</FormLabel> */}
          <RadioGroup
            row
            name="type"
            value={inputTransaction.type}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="expense"
              control={<Radio color="primary" />}
              label="Expense"
            />
            <FormControlLabel
              value="income"
              control={<Radio color="primary" />}
              label="Income"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          name="detail"
          label="Description"
          variant="outlined"
          onChange={handleInputChange}
          value={inputTransaction.detail}
          helperText={helper.detail}
          onClick={() =>
            setHelper((prev) => {
              return {
                ...prev,
                detail: "",
              };
            })
          }
        />

        <TextField
          name="amount"
          label="Amount"
          variant="outlined"
          type="Number"
          onChange={handleInputChange}
          value={inputTransaction.amount}
          helperText={helper.amount}
          onClick={() =>
            setHelper((prev) => {
              return {
                ...prev,
                amount: "",
              };
            })
          }
        />

        <TextField
          name="date"
          type="date"
          variant="outlined"
          value={inputTransaction.date}
          onChange={handleInputChange}
        />

        <FormControl>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            name="category"
            value={inputTransaction.category}
            onChange={handleInputChange}
            onClick={() =>
              setHelper((prev) => {
                return {
                  ...prev,
                  category: "",
                };
              })
            }
          >
            {categoryArr.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{helper.category}</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          name="submit"
          onClick={(event) => {
            event.preventDefault();

            //add transaction to the list in parent component "App" if non empty inputs
            if (isValid()) {
              //close the form first if the from appears inside dialog box
              props.handleFormClose();
              props.addTransaction(inputTransaction);

              //clear input field and assign a new id
              setInputTransaction((prevState) => {
                return {
                  _id: "",
                  detail: "",
                  amount: "",
                  date: currDate,
                  type: prevState.type,
                  category: "",
                };
              });
            }
          }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddTransaction;
