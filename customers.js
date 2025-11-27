import fs from "fs/promises";

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
    async findUser(nome, senha) {
        const json = JSON.parse(await fs.readFile(path, "utf8"));
        console.log(json);

        const userExist = json.find(user => user.usuario === nome && user.senha === senha);
        if (userExist) {
            return userExist;
        } else {
            return false;
        }
    }
}

export default myJson;
