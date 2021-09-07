import {
  Avatar,
  Card,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CodeSharp } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    flexGrow: 1,
    display: "flex",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, .25)",
    backdropFilter: "blur(5px)",
  },
  cardText: {
    marginLeft: 20,
    width: "100%",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  walletDir: {
    display: "flex",
  },
  walletUrl: {
    marginRight: 5,
    width: 300,
  },
  link: {
    textDecoration: "none",
  },
}));

function PreviewCard({ card }) {
  let userId = card._id;

  const [wallets, setWallets] = useState([]);

  const getUserTasks = async (id) => {
    const result = await axiosClient.get(`/api/wallets/${id}`);

    setWallets(result.data);
  };

  //get wallets of each user to preview
  useEffect(() => {
    getUserTasks(userId);
  }, [userId]);

  const classes = useStyles();

  return (
    <Link className={classes.link} to={`/card/${userId}`} target="_blank">
      <Card elevation={2} className={classes.card}>
        <Avatar src={card.avatar} className={classes.large}></Avatar>
        <div className={classes.cardText}>
          <Typography variant="h5"> {card.username} </Typography>
          {wallets.map((wallet) => (
            <div className={classes.walletDir} key={wallet._id}>
              <Typography noWrap className={classes.walletUrl}>
                {wallet.direction}
              </Typography>
              <Typography className={classes.cardText}>
                {wallet.type}
              </Typography>
            </div>
          ))}
        </div>
      </Card>
    </Link>
  );
}

export default PreviewCard;
