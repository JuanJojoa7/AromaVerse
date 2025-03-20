import {object, string} from 'zod';

export const userSchema = object({
    name: string({required_error: 'Name is required'}),
    email: string({required_error: 'Email is required'})
        .email({message: 'Email is not valid'}),
    password: string({required_error: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'}),

})

export const userLoginSchema = object({
    email: string({required_error: 'Email is required'})
        .email({message: 'Email is not valid'}),
    password: string({required_error: 'Password is required'})
        .min(8, {message: 'Password must be at least 8 characters long'}),
})