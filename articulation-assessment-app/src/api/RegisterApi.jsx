const apiUrlAuth = `http://4.182.184.83/auth-api/api/auth/register`;
const apiUrlUser = `http://4.182.184.83/users-api/api/SpeechTherapist/add`;


const RegisterApi = async (registerCredentials) => {
    try {
        console.log(registerCredentials)
        // First API call to register user
        const userResponse = await fetch(apiUrlUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: registerCredentials.firstName,
                lastName: registerCredentials.lastName,
                email: registerCredentials.email
            })
        });
        console.log(userResponse)

        if (userResponse.status === 400) {
            return { success: false, error: "Already a user with this information." };
        }
        if (!userResponse.ok) {
            const userError = await userResponse.json();
            return { success: false, error: userError.message };
        }

        // Extract the user ID from the response
        const userData = await userResponse.json();
        console.log(userData);
        const userId = userData.id;

        // Second API call to register auth with the user ID
        const authResponse = await fetch(apiUrlAuth, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                email: registerCredentials.email,
                password: registerCredentials.password,
                role: "SpeechTherapist" 
            })
        });

        if (!authResponse.ok) {
            const authError = await authResponse.json();
            return { success: false, error: authError.message };
        }

        const authData = await authResponse.json();
        console.log('Auth Data:', authData);

        return { success: true };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, error: 'Network error' };
    }
};

export default RegisterApi;

