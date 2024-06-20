import UploadToBlob from './UploadToBlob'; // Import uploadToBlobStorage function
const apiUrl = `http://4.182.83.212/forums-api/api/Post/add`;

const AddPostApi = async (postCredentials) => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    const token = getCookie('token');

    try {       
        const currentDateTime = new Date().toISOString();
        let postBody = {
            title: postCredentials.title,
            content: postCredentials.content,
            authorId: postCredentials.authorId,
            audience: postCredentials.audience,
            dateTime: currentDateTime,
            forumId: postCredentials.forumId 
        };

        if (postCredentials.file != null) {
            const fileUrl = await UploadToBlob(postCredentials.file);
            postBody = {
                ...postBody,
                url: fileUrl
            };
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postBody)
        });

        if (response.status === 400) {
            return { success: false, error: 'Already a post with this information.' };
        }

        if (!response.ok) {
            const error = await response.json();
            return { success: false, error: error.message };
        }

        return { success: true };
    
    } catch (error) {
        console.error('Error during adding post:', error);
        return { success: false, error: 'Network error' };
    }
};

export default AddPostApi;
