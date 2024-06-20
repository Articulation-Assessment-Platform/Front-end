const apiUrl = `http://4.182.83.212/forums-api/api/Post/add`;


const ViewPostApi = async (post) => {
    try {
        const userResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: post.firstName
            })
        });

        if (userResponse.status === 400) {
            return { success: false, error: "Already a post with this information." };
        }
        if (!userResponse.ok) {
            const userError = await userResponse.json();
            return { success: false, error: userError.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Error during adding post:', error);
        return { success: false, error: 'Network error' };
    }
};

export default ViewPostApi;