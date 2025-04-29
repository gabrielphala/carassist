import mongoose from "mongoose"
import QueryBuilder from "../../helpers/Query-builder"

import Message from "./Message"

export default new Message(mongoose, QueryBuilder);