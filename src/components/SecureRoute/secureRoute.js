import {Navigate, Outlet} from "react-router-dom";
import {connectedUser} from "../../Service/auth.service";

const SecureRoute = (props) => {
    const user = connectedUser();
    return (
      user ? <Outlet/> : <Navigate to={'/auth'}/>
    );
}

export default SecureRoute;