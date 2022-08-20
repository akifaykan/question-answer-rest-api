import bcrypt from "bcryptjs"

export const validateUserInput = (email, password) => {
    return email && password
}

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}
