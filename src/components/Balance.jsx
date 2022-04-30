import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Grid from "@material-ui/core/Grid"; //extra

function Balance(props) {
  return (
    <Grid container spacing={1} direction="row" justifyContent="space-evenly">
      {/* <div className="balance"> */}
      <Grid item xs={4} md={12}>
        <div className="balance-card balance-expense">
          <Avatar style={{ backgroundColor: "#f443362a" }}>
            <AccountBalanceWalletIcon style={{ color: "#f44336" }} />
          </Avatar>
          <div className="balance-content-amount">
            <span>&#x20b9;</span>
            {props.balance.expense}
          </div>
          <p>Expense</p>
        </div>
      </Grid>
      <Grid item xs={4} md={12}>
        <div className="balance-card balance-income">
          <Avatar style={{ backgroundColor: "#38a53c2f" }}>
            <AccountBalanceWalletIcon style={{ color: "#4caf4f" }} />
          </Avatar>
          <div className="balance-content-amount">
            <span>&#x20b9;</span>
            {props.balance.income}
          </div>
          <p>Income</p>
        </div>
      </Grid>
      <Grid item xs={4} md={12}>
        <div className="balance-card balance-remaining">
          <Avatar style={{ backgroundColor: "#2196f32a" }}>
            <AccountBalanceWalletIcon style={{ color: "#2196f3" }} />
          </Avatar>
          <div className="balance-content-amount">
            {props.balance.income < props.balance.expense && <span>-</span>}
            <span>&#x20b9;</span>
            {Math.abs(props.balance.income - props.balance.expense)}
          </div>
          <p>Balance</p>
        </div>
      </Grid>
      {/* </div> */}
    </Grid>
  );
}

export default Balance;
