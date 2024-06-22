const apiUrl = `http://4.182.195.93/forums-api/api/Post/get/publicforum`;

const GetPostsApi = async () => {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

export default GetPostsApi;
