import User from "../objects/User";
import { zenCafeApiUrl } from "./envVars";


function dataToUserObj(data: any): User {
    const { _id, legalName, username } = data;

    const userToReturn = new User(legalName, _id, username);

    return userToReturn;
}

export async function createUser(google_id: string, username: string, legalName: string): Promise<User> { // no jwt because no user thus no jwt. Also chatgpt said use rate limiting or captcha to stop people from making tons of accounts
    try {
        console.log(google_id);
        console.log(username);
        console.log(legalName); // cannot be an empty string for some reason
        const response = await fetch(`${zenCafeApiUrl}/users/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                legalName: legalName,
                username: username,
                google_id: google_id
            })
        });

        if (!response.ok) {
            console.error('createUser Error:', 'Failed to fetch');
            throw Error("Fetch createUser Failed");
        }

        const data = await response.json(); // data type any for json

        const { user, token } = data;

        localStorage.setItem('currentZenUserJwtToken', token);

        const userToReturn = dataToUserObj(user);

        return userToReturn;

    } catch (error) {
        console.error('createUser Error:', 'Failed to fetch');
        throw error;
    }
}

export async function doesUserExist(google_id: string): Promise<boolean> { // no jwt not really 
    try {
        const response = await fetch(`${zenCafeApiUrl}/users/doesUserExist/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('doesUserExist Error:', 'Failed to fetch');
            throw Error("Fetch doesUserExist Failed");
        }

        const data = await response.json();

        const { doesUserExist } = await data;

        return doesUserExist;

    } catch (error) {
        console.error('doesUserExist Error:', error);
        throw error;
    }
}

export async function isTokenValid(): Promise<boolean> { // no jwt not really 
    try {
        const response = await fetch(`${zenCafeApiUrl}/users/isTokenValid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('currentZenUserJwtToken')}`
            },
        });

        const data = await response.json();

        const { expired } = data;

        if (expired) {
            throw Error("Token Expired");
        }

        if (!response.ok) {
            console.error('doesUserExist Error:', 'Failed to fetch');
            throw Error("failed to fetch");
        }

        return true;

    } catch (error) {
        console.error('doesUserExist Error:', error);
        throw error;
    }
}

// Expected: google_id user must already exist
export async function getUser(google_id: string): Promise<User> {
    try {
        const response = await fetch(`${zenCafeApiUrl}/users/getUser/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('getUser Error:', 'Failed to fetch');
            throw Error("Failed fetch get user");
        }

        const data = await response.json(); // data type any for json

        const { user, token } = data;

        localStorage.setItem('currentZenUserJwtToken', token);

        const userToReturn = dataToUserObj(user);

        return userToReturn;

    } catch (error) {
        console.error('getUser Error:', error);
        throw error
    }
}