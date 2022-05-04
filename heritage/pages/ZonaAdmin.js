import { userService } from "../services/userService";

export default function ZonaAdmin() {
    return (<a onClick={userService.logout} className="nav-item nav-link">Logout</a>);

}
