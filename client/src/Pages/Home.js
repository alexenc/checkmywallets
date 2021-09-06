import {
  Button,
  Container,
  Grid,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import { useHistory } from "react-router";
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PreviewCard from "../components/PreviewCard";
import { CardContext } from "../context/cardInfoContext";
import { AuthContext } from "../context/authContext";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    margin: 5,
  },
  toolbar: {
    backgroundColor: "white",
  },
  subtitle1: {
    marginTop: 100,
  },
  subtitle2: {
    marginTop: 25,
    marginBottom: 75,
  },
  dashboardlinks: {
    cursor: "pointer",
    marginRight: 20,
  },
  link: {
    textDecoration: "none",
    marginRight: 20,
    cursor: "pointer",
    color: "black",
  },
}));

function Home() {
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const { setCardId } = useContext(CardContext);

  const classes = useStyles();

  const getdata = async () => {
    const url = "/api/users";
    const result = await axiosClient.get(url);

    setCards(result.data);
  };

  const { authState, tokenSetter } = useContext(AuthContext);

  useEffect(() => {
    getdata();
  }, [cards]);

  const logOutHandler = (e) => {
    tokenSetter();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" className={classes.title}>
            Check my wallets
          </Typography>
          {authState.token ? (
            <>
              <Link to="/dashboard" className={classes.link}>
                Manage your wallets
              </Link>
              <p
                className={classes.dashboardlinks}
                onClick={(e) => logOutHandler(e)}
              >
                Log out
              </p>
            </>
          ) : (
            <>
              <Link to="/login" className={classes.link}>
                <Button color="secondary" variant="contained">
                  Log-in
                </Button>
              </Link>
              <Link to="/Signup" className={classes.link}>
                <Button
                  endIcon={<PersonAddIcon />}
                  color="secondary"
                  variant="contained"
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h3" align="center" className={classes.subtitle1}>
          Best way to help your favourite creators
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.subtitle2}
        >
          With CheckMyWallets you can easily find the wallet directions of all
          your favourite creators
          <br /> and they will recibe 100% of your support
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={card._id}>
              <PreviewCard card={card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
