import { connect } from "mongoose"

export default async () => {
    await connect(decodeURIComponent(
        ["development", 'staging'].includes(process.env.NODE_ENV)
        ? process.env.DATABASE_URL
        : process.env.CLOUD_DATABASE_URL
    ))
}

export const MONGO_ID_LEN = 24;