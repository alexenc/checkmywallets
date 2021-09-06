import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div>
      <Typography>Error 404</Typography>
      <Link to="/">Go back to main page</Link>
    </div>
  );
}

export default Error404;
