import jwtMiddleware from "../jwtMiddleware"
import errorHandler from "./errorHandler";

export default function apiHandler(handler) {
    return async (req, res) => {
        try {
            await jwtMiddleware(req, res);
            await handler(req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}