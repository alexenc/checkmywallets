import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, .25)",
    backdropFilter: "blur(5px)",
  },
  Typography: {
    position: "relative",
    marginLeft: "10px",
    overflowWrap: "break-word",
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  deleteBtn: {
    color: "red",
  },
  editBtn: {
    color: "#009688",
  },
  icon: {
    position: "relative",
    top: "6px",
    right: "3px",
  },
}));

function ManageWallet(wallet, getUserWallets) {
  const classes = useStyles();
  const [showForm, setShowFrom] = useState(false);
  const [walletPut, setWalletPut] = useState({
    direction: wallet.wallet.direction,
    type: wallet.wallet.type,
  });
  const [alert, setAlert] = useState(null);

  const onChangeHandler = (e) => {
    setWalletPut({
      ...walletPut,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (e) => {
    const url = `/api/wallets/${wallet.wallet._id}`;
    console.log(url);
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      await axiosClient.delete(url, config);
      getUserWallets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditWallet = async (e) => {
    e.preventDefault();
    const url = `/api/wallets/${wallet.wallet._id}`;
    console.log(url);
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      await axiosClient.put(url, walletPut, config);
      handleShowForm();
      getUserWallets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowForm = (e) => {
    if (showForm) {
      setShowFrom(false);
    } else {
      setShowFrom(true);
    }
  };

  return (
    <Card variant="outlined" className={classes.paper}>
      <Typography variant="subtitle2">Adress</Typography>
      <Typography
        variant="body2"
        className={classes.Typography}
        whiteSpace="normal"
      >
        {wallet.wallet.direction} - {wallet.wallet.type}
      </Typography>

      <Button
        className={classes.deleteBtn}
        endIcon={<DeleteIcon />}
        onClick={(e) => handleDelete(e)}
      >
        Delete
      </Button>
      {showForm ? (
        <Button className={classes.editBtn} onClick={(e) => handleShowForm(e)}>
          Close edit form
        </Button>
      ) : (
        <Button
          endIcon={<EditIcon />}
          className={classes.editBtn}
          onClick={(e) => handleShowForm(e)}
        >
          Edit wallet
        </Button>
      )}

      {showForm && (
        <>
          {alert && <Typography color="error">{alert}</Typography>}
          <form
            className={classes.field}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleEditWallet(e)}
          >
            <TextField
              className={classes.field}
              label="Adress"
              color="secondary"
              value={walletPut.direction}
              variant="outlined"
              name="direction"
              type="text"
              onChange={(e) => onChangeHandler(e)}
              fullWidth
              required
            />
            <TextField
              className={classes.field}
              label="Crypro"
              color="secondary"
              variant="outlined"
              name="type"
              value={walletPut.type}
              onChange={(e) => onChangeHandler(e)}
              type="Text"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="secondary">
              Edit Wallet
            </Button>
          </form>
        </>
      )}
    </Card>
  );
}

export default ManageWallet;
