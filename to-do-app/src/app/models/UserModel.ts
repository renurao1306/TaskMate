export interface UserRegistrationModel {
    name: string,
    username: string,
    contact: string,
    email: string,
    dob: Date,
    token: string
}

export interface UserLoginModel {
    name: string,
    username: string,
    token: string
}