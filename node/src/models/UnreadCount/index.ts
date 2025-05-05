import mongoose from "mongoose"
import QueryBuilder from "../../helpers/Query-builder"

import UnreadCount from "./UnreadCount"

export default new UnreadCount(mongoose, QueryBuilder);