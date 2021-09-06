import {
  Typography,
  Container,
  TextField,
  makeStyles,
  Button,
  Grid,
  CardContent,
  Card,
} from "@material-ui/core";

import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ManageWallet from "../components/ManageWallet";
import { AuthContext } from "../context/authContext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { CardContext } from "../context/cardInfoContext";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: theme.palette.secondary.dark,
  },
  walletsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    marginTop: "35px",
    marginBottom: "35px",
  },
  addWalletContainer: {
    width: "55vh",
    marginTop: 10,
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: "inherit",
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, .25)",
    marginBottom: 20,
  },
}));

function Dashboard() {
  const history = useHistory();
  const classes = useStyles();
  const { authState, getIdFromjwt, tokenSetter } = useContext(AuthContext);
  const { setCardId } = useContext(CardContext);
  const userId = getIdFromjwt(authState.token);

  const [wallet, setWallet] = useState({
    direction: "",
    type: "",
  });

  const { direction, type } = wallet;

  const [userWallets, setUserWalllets] = useState([]);

  const onChangeHandler = (e) => {
    setWallet({
      ...wallet,
      [e.target.name]: e.target.value,
    });
  };

  const [user, setUser] = useState();

  //fetch data

  const submitHandler = async (e) => {
    e.preventDefault();

    //validation
    if (wallet.url === "" || wallet.crypto === "") {
      console.log("both fields required");
    }

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axiosClient.post(
        "/api/wallets",
        {
          direction,
          type,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }

    setWallet({
      direction: "",
      type: "",
    });
  };

  const getUsername = async () => {
    const user_id = getIdFromjwt(authState.token);
    try {
      const res = await axiosClient.get(`/api/users/${user_id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsername();
  }, []);

  const getUserWallets = async () => {
    const user_id = getIdFromjwt(authState.token);

    try {
      const res = await axiosClient.get(`/api/wallets/${user_id}`);
      setUserWalllets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserWallets();
  }, [userWallets]);

  const deleteUserHandler = (e) => {
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    try {
      axiosClient.delete(`/api/users/${userId}`, config);
      tokenSetter();
      history.push("/");
    } catch (error) {}
  };

  return (
    <>
      <Container>
        <Link to="/" className={classes.link}>
          <Button color="secondary" startIcon={<NavigateBeforeIcon />}>
            Go back to main page
          </Button>
        </Link>
        <Typography variant="h3" className={classes.walletsContainer}>
          Your Wallets
        </Typography>
        <Grid container spacing={3} className={classes.gridContainer}>
          {userWallets.map((wallet) => (
            <Grid item xs={12} md={6} lg={4} key={wallet._id}>
              <ManageWallet wallet={wallet} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.addWalletContainer}>
        <Card className={classes.card}>
          <Typography className={classes.walletsContainer} variant="h3">
            {" "}
            Add a new wallet
          </Typography>
          <form
            onSubmit={(e) => submitHandler(e)}
            className={classes.field}
            noValidate
            autoComplete="off"
          >
            <TextField
              className={classes.field}
              label="Adress"
              color="secondary"
              value={wallet.direction}
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
              value={wallet.type}
              onChange={(e) => onChangeHandler(e)}
              type="Text"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="secondary">
              Add Wallet
            </Button>
          </form>
        </Card>
        <Button onClick={(e) => deleteUserHandler(e)}>
          Delete your account
        </Button>
        <Link className={classes.link} to={`/card/${userId}`} target="_blank">
          View your public page
        </Link>
      </Container>
    </>
  );
}

export default Dashboard;
