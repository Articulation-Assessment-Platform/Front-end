const apiUrl = `http://4.182.195.93/forums-api/api/Post/get/forum/1`;

const GetSpeechTherapistPostsApi = async () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const token = getCookie('token');

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const userError = await response.json();
            return { success: false, error: userError.message };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error during fetching posts:', error);
        return { success: false, error: 'Network error' };
    }
};

export default GetSpeechTherapistPostsApi;
