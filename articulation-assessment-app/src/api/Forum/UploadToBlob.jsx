import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = 'BlobEndpoint=https://articulationstorage.blob.core.windows.net/;QueueEndpoint=https://articulationstorage.queue.core.windows.net/;FileEndpoint=https://articulationstorage.file.core.windows.net/;TableEndpoint=https://articulationstorage.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-07-05T22:47:34Z&st=2024-06-20T14:47:34Z&spr=https,http&sig=Dj5IHsoOUuSVXkcD2bjKGS5%2BZummO%2Fk5%2Ff0uh6FjB3A%3D';

const UploadToBlob = async (file) => {
    try {
        // Create a BlobServiceClient using the provided connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        // Get a ContainerClient for the postcontainer
        const containerName = 'postcontainer';
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Use the file's name directly
        const fileName = file.name;

        // Get a BlockBlobClient for the blob with the filename
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        // Upload file to Azure Blob Storage
        const response = await blockBlobClient.uploadBrowserData(file);

        console.log('File uploaded successfully:', response.requestId);

        // Return the URL of the uploaded file
        return blockBlobClient.url;
    } catch (error) {
        console.error('Error uploading file to Azure Blob Storage:', error.message);
        throw error;
    }
};

export default UploadToBlob;
