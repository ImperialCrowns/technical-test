type UserLogin = {
    email: string;
    password: string;
};

type UserRegister = {
    email: string;
    password: string;
    username: string;
    magicKey: string,
};

export type { UserLogin, UserRegister };