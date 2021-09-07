import {
  Typography,
  Container,
  TextField,
  makeStyles,
  Button,
  Card,
} from "@material-ui/core";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";

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

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [alert, setAlert] = useState(null);

  const { authState, tokenSetter, setAuthState, getIdFromjwt } =
    useContext(AuthContext);

  const onChangeHandler = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/api/auth", {
        email,
        password,
      });

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      history.push("/");
      tokenSetter(res.data.token);
      getIdFromjwt(res.data.token);
    } catch (error) {
      setAlert(error.response.data.msg);
    }

    setUser({
      email: "",
      password: "",
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
            onSubmit={(e) => submitHandler(e)}
          >
            <TextField
              className={classes.field}
              label="Email or username"
              color="secondary"
              variant="outlined"
              value={user.email}
              type="email"
              name="email"
              fullWidth
              onChange={(e) => onChangeHandler(e)}
              required
            />
            <TextField
              className={classes.field}
              label="Password"
              color="secondary"
              variant="outlined"
              value={user.password}
              type="password"
              onChange={(e) => onChangeHandler(e)}
              fullWidth
              name="password"
              required
            />

            <Button variant="contained" type="submit" color="secondary">
              Log In
            </Button>
          </form>

          <Link to="/signup" className={classes.link}>
            Don't have an account?
          </Link>
        </Card>
      </Container>
    </>
  );
}

export default Login;
