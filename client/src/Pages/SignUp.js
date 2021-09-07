import {
  Typography,
  Container,
  TextField,
  makeStyles,
  Button,
  Card,
} from "@material-ui/core";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axiosClient from "../config/axios";
import { AuthContext } from "../context/authContext";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  link: {
    textDecoration: "none",
    marginLeft: 15,
    marginTop: 50,
    cursor: "pointer",
    color: "inherit",
  },
  centered: {
    width: "585px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "Translate(-50%, -50%)",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  card: {
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, .25)",
    backdropFilter: "blur(5px)",
  },
}));

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password, avatar } = user;
  const [alert, setAlert] = useState(null);
  const { authState, tokenSetter } = useContext(AuthContext);

  const onChangeHandler = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.password.length < 6) {
      return setAlert("password must contain at least 6 characters");
    }

    try {
      const res = await axiosClient.post("/api/users", {
        email,
        username,
        password,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      history.push("/");
      tokenSetter(res.data.token);
    } catch (error) {
      setAlert(error.response.data.msg);
    }

    setUser({
      email: "",
      username: "",
      password: "",
      avatar: null,
    });
  };

  return (
    <>
      <Container className={classes.centered}>
        {alert && <Typography color="error">{alert}</Typography>}
        <Card className={classes.card}>
          <Link to="/" className={classes.link}>
            Go back to main page
          </Link>
          <form
            className={classes.field}
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <TextField
              className={classes.field}
              label="Email"
              color="secondary"
              variant="outlined"
              type="email"
              value={email}
              fullWidth
              name="email"
              onChange={(e) => onChangeHandler(e)}
              required
            />
            <TextField
              className={classes.field}
              label="Username"
              color="secondary"
              variant="outlined"
              value={username}
              type="text"
              fullWidth
              name="username"
              onChange={(e) => onChangeHandler(e)}
              required
            />
            <TextField
              className={classes.field}
              label="Password"
              color="secondary"
              value={password}
              variant="outlined"
              type="password"
              name="password"
              onChange={(e) => onChangeHandler(e)}
              fullWidth
              required
            />
            <TextField
              disabled
              className={classes.field}
              color="secondary"
              value="working on the avatar feature"
              variant="outlined"
              name="avatar"
              onChange={(e) => onChangeHandler(e)}
              fullWidth
            />

            <Button variant="contained" type="submit " color="secondary">
              Signup
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default SignUp;
