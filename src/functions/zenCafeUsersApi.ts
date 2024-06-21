
export async function createUser(google_id: string, username: string, legalName: string): Promise<any | null> {
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
            console.error('Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json(); // data type any for json

        return data;

    } catch (error) {
        console.error('Error:', 'Failed to fetch');
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
            console.error('Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json();

        const { doesUserExist } = await data;

        return doesUserExist;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Expected: google_id user must already exist
export async function getUser(google_id: string): Promise<any | null> {
    try {
        const response = await fetch(`http://localhost:3000/users/getUser/${google_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.error('Error:', 'Failed to fetch');
            return null;
        }

        const data = await response.json(); // data type any for json

        return data;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}