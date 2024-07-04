import User from "../objects/User";

function dataToUserObj(data: any): User {
    const { _id, legalName, username } = data;

    const userToReturn = new User(_id, legalName, username);

    return userToReturn;
}

export async function createUser(google_id: string, username: string, legalName: string): Promise<User | null> {
    try {
        console.log(google_id);
        console.log(username);
        console.log(legalName); // cannot be an empty string for some reason
        const response = await fetch('http://localhost:3000/users/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                legalName: legalName,
                username: username,
                google_id: google_id
            })
        });

        if (!response.ok) {
            console.error('createUser Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json(); // data type any for json

        const userToReturn = dataToUserObj(data);

        return userToReturn;

    } catch (error) {
        console.error('createUser Error:', 'Failed to fetch');
        return null;
    }
}

export async function doesUserExist(google_id: string): Promise<boolean | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/doesUserExist/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('doesUserExist Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        const { doesUserExist } = await data;

        return doesUserExist;

    } catch (error) {
        console.error('doesUserExist Error:', error);
        return null;
    }
}

// Expected: google_id user must already exist
export async function getUser(google_id: string): Promise<User | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/getUser/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('getUser Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json(); // data type any for json

        const userToReturn = dataToUserObj(data);

        return userToReturn;

    } catch (error) {
        console.error('getUser Error:', error);
        return null;
    }
}