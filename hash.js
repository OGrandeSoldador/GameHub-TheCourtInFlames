import bcrypt from "bcrypt";

export const bcryptData = {
    async bcryptPassword(senha) {
        const hash = await bcrypt.hash(senha, 10);
        return hash;
    },
    async comparePassword(senha, hash) {
        const result = await bcrypt.compare(senha, hash);
        return result;
    }
}

export default bcryptData;
