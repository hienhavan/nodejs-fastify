interface User {
    id: number;
    name: string;
    email: string;
}

const user1: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
}

class userAccount {
    id: number;
    name: string;
    email: string;

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email
    }
}

const user2: User = new userAccount(2, 'Jane Doe', 'jane.doe@example.com');


function test(user: User) { }
