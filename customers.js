import fs from "fs/promises";
import bcryptData from "./hash.js";

const path = "./customersData.json"

export const myJson = {
    async addToJSON(dataToAdd) {
        const json = JSON.parse(await fs.readFile(path, "utf8"));
        json.push(dataToAdd);
        await fs.writeFile(path, JSON.stringify(json, null, 2));
    },
    async readJSON() {
        const data = await fs.readFile(path, "utf8");
        const json = JSON.parse(data);
        return json.length;
    },
    async findUser(nome, password) {
        const json = JSON.parse(await fs.readFile(path, "utf8"));

        const userExist = json.find(user => user.usuario === nome);
        if (userExist) {
            const verifyPassword = await bcryptData.comparePassword(password, userExist.senha);
            if (verifyPassword) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    async findUsername(nome) {
        const json = JSON.parse(await fs.readFile(path, "utf8"));
        const userExist = json.find(user => user.usuario === nome);
        if (userExist) {
            return true;
        } else {
            return false;
        }
    },
    async findEmail(userEmail) {
        const json = JSON.parse(await fs.readFile(path, "utf8"));
        const emailExist = json.find(user => user.email === userEmail);
        if (emailExist) {
            return true;
        } else {
            return false;
        }
    }
}

export default myJson;
