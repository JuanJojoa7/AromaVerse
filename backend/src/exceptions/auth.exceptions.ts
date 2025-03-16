class AuthError extends Error {
    name: string = this.constructor.name;
    
    constructor(message: string) {
        super(message);
        this.stack = "Authentication error \n" + this.stack;
    }
}

export { AuthError };