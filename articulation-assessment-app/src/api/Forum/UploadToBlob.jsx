import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = 'BlobEndpoint=https://articulationstorage.blob.core.windows.net/;QueueEndpoint=https://articulationstorage.queue.core.windows.net/;FileEndpoint=https://articulationstorage.file.core.windows.net/;TableEndpoint=https://articulationstorage.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-07-05T22:47:34Z&st=2024-06-20T14:47:34Z&spr=https,http&sig=Dj5IHsoOUuSVXkcD2bjKGS5%2BZummO%2Fk5%2Ff0uh6FjB3A%3D';

const UploadToBlob = async (file) => {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const containerName = 'postcontainer';
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const fileName = file.name;

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);

        return blockBlobClient.url;
    } catch (error) {
        console.error('Error uploading file to Azure Blob Storage:', error.message);
        throw error;
    }
};

export default UploadToBlob;
