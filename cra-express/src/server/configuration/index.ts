import { Configuration } from "../../types/config.type";
import { config } from "./dev.config"
import { config as devConfig } from "./prod.config"

export const getConfig = () : Configuration => {
    const { ENVIRONMENT = "development" } = process.env;
    if(ENVIRONMENT === "development") {
        return devConfig;
    } else {
        return config;
    }
}