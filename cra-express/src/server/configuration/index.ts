import { Configuration } from "../../types/config.type";
import { config } from "./dev.config"
import { config as devConfig } from "./prod.config"

export const getConfig = () : Configuration => {
    const { NODE_ENV = "development" } = process.env;
    if(NODE_ENV === "development") {
        return devConfig;
    } else {
        return config;
    }
}