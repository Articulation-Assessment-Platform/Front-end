const apiUrl = 'http://4.182.83.212/users-api/api/SpeechTherapist/profile';

const GetUserApi = async () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const token = getCookie('token');
    console.log("Token:", token);



    try {
        const userResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (userResponse.ok) {
            const data = await userResponse.json();
            
            return { success: true, data };
        } else if (userResponse.status === 401) {
            console.error('Unauthorized');
            return { success: false, error: 'Unauthorized' };
        } else {
            const error = await userResponse.json();
            return { success: false, error: error.message }; 
        }
    } catch (error) {
        console.error('Error while fetching profile:', error);
        return { success: false, error: 'Network error' };
    }
};

export default GetUserApi;
