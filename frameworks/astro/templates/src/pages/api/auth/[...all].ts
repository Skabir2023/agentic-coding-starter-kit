import { auth } from "../../../lib/auth";
import { toWebHandler } from "better-auth/node";

export const ALL = toWebHandler(auth);