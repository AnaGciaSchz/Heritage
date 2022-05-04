import jwtMiddleware from "../jwtMiddleware"
import errorHandler from "./errorHandler";

export default function apiHandler(handler) {
    return async (req, res) => {
        try {
            // global middleware
            await jwtMiddleware(req, res);

            // route handler
            await handler(req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}