import bcrypt from "bcryptjs"

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, hashPass: string) => {
    return bcrypt.compareSync(password, hashPass)
}

