import { JwtPayload } from "src/common";

export const  getPayload=(load:JwtPayload)=>{
    return {
        id:load.id,
        role:load.role
    }
}