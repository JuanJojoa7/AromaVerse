import {object, string} from 'zod';

export const userSchema = object({
    name: string({required_error: 'Name is required'}).min(1, {message: 'Name cannot be empty'}),
    email: string({required_error: 'Email is required'}).min(1, {message: 'Email cannot be empty'}),
    password: string({required_error: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'}),
    phone: string({required_error: 'Number is required'}).min(10, {message: 'Number must be at least 10 characters long'}),
    address: string({required_error: 'Address is required'}).min(1, {message: 'Address cannot be empty'})

})

export const userLoginSchema = object({
    email: string({required_error: 'Email is required'})
        .email({message: 'Email is not valid'}),
    password: string({required_error: 'Password is required'})
})