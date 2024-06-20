const apiUrl = `http://4.182.83.212/forums-api/api/Post/delete`;


const DeletePostApi = async (postId) => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const token = getCookie('token');
    const apiUrl = `http://4.182.83.212/forums-api/api/Post/delete/${postId}`;

    try {
        const userResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!userResponse.ok) {
            const userError = await userResponse.json();
            return { success: false, error: userError.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Error during deleting post:', error);
        return { success: false, error: 'Network error' };
    }
};

export default DeletePostApi;