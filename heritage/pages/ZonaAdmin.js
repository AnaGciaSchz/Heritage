import { userService } from "../services/userService";
import TextEditor from "../components/TextEditor/TextEditor"

export default function ZonaAdmin() {
    return (<>
    <button onClick={userService.logout} className="nav-item nav-link">Logout</button>
    <TextEditor />
    </>);

}
