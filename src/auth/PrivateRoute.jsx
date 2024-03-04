import { useSelector } from "react-redux";
import Redirect from "./Redirect";
function PrivateRoute({ children }) {
  // check if token availbel then redirect on private route
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Redirect />;
}

export default PrivateRoute;
