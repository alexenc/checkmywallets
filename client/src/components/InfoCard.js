import { useEffect, useState } from "react";

import {
  Avatar,
  Card,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
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
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30,
  },
  avatar: {
    position: "relative",
    top: 19,
    right: 20,
  },
  wallet: {
    overflowWrap: "break-word",
  },
}));

function InfoCard() {
  const classes = useStyles();
  const [wallets, setWallets] = useState([]);
  const [user, setUser] = useState({});
  let { slug } = useParams();
  console.log("this is a test", slug);
  const getdata = async () => {
    const url = `/api/wallets/${slug}`;
    const url2 = `/api/users/${slug}`;
    const result = await axiosClient.get(url);
    const result2 = await axiosClient.get(url2);
    setWallets(result.data);
    setUser(result2.data);
  };

  useEffect(() => {
    getdata();
  }, [slug]);

  const copyToClipboard = (e) => {};
  return (
    <>
      <Container className={classes.centered}>
        <Card className={classes.card}>
          <Typography className={classes.title} variant="h2">
            {/*<Avatar
              src={user.avatar}
              variant="square"
              className={classes.avatar}
            />*/}
            {user.username}'s Wallets
          </Typography>
          <Typography>
            {wallets.map((wallet) => (
              <Typography className={classes.wallet}>
                {wallet.direction} - {wallet.type}
              </Typography>
            ))}
          </Typography>
        </Card>
      </Container>
    </>
  );
}

export default InfoCard;
