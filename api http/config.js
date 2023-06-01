import {config} from 'dotenv'
config()

export const PORT= process.env.PORT || 3060
export const DB_CONECT= process.env.DB_CONECT 
export const SING= process.env.SING 