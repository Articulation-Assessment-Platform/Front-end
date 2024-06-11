const apiUrl = 'http://localhost:5000/users-api/api/SpeechTherapist/profile';

const GetUserApi = async () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const token = getCookie('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        
        if (response.ok) {
            const data = await response.json();
            
            return { success: true, data };
        } else if (response.status === 401) {
            console.error('Unauthorized');
            return { success: false, error: 'Unauthorized' };
        } else {
            const error = await response.json();
            return { success: false, error: error.message }; 
        }
    } catch (error) {
        console.error('Error while fetching profile:', error);
        return { success: false, error: 'Network error' };
    }
};

export default GetUserApi;
