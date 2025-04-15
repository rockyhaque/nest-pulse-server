const loginUser = async (payload: {email: string, password: string}) => {
    console.log("User loging",payload)
}

export const authService = {
    loginUser
}