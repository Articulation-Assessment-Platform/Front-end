const apiUrl = 'http://10.0.140.40:5000/auth-api/api/auth/login';

const LoginApi = async (loginCredentials) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCredentials)
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        
        if (response.ok) {
            // Extract JWT token from response
            const data = await response.json();
            const token = data.token;
            
            // Return token or any other data needed
            return { success: true, token };
        } else if (response.status === 401) {
            // Unauthorized - Handle accordingly
            console.error('Unauthorized: Invalid credentials');
            return { success: false, error: 'Invalid credentials' };
        } else {
            // Handle other error responses
            const error = await response.json();
            return { success: false, error: error.message }; 
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error during login:', error);
        return { success: false, error: 'Network error' };
    }
};

export default LoginApi;
