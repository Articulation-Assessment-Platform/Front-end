const apiUrlUser = `http://4.182.83.212/users-api/api/SpeechTherapist/add`;


const RegisterApi = async (registerCredentials) => {
    try {
        const userResponse = await fetch(apiUrlUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: registerCredentials.firstName,
                lastName: registerCredentials.lastName,
                email: registerCredentials.email,
                password: registerCredentials.password,
                role: "SpeechTherapist" 
            })
        });

        if (userResponse.status === 400) {
            return { success: false, error: "Already a user with this information." };
        }
        if (!userResponse.ok) {
            const userError = await userResponse.json();
            return { success: false, error: userError.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, error: 'Network error' };
    }
};

export default RegisterApi;

