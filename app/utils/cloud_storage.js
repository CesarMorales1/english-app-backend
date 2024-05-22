import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

const storage = new Storage({
    projectId: "english-plis",
    keyFilename: './serviceAccountKey.json'
});

const bucket = storage.bucket("gs://english-plis.appspot.com");

export default (fileBase64, pathImage, deletePathImage) => {
    return new Promise((resolve, reject) => {
        
        if (deletePathImage) {
            const parseDeletePathImage = parse(deletePathImage);
            const ulrDelete = parseDeletePathImage.pathname.slice(23);
            const fileDelete = bucket.file(ulrDelete);

            fileDelete.delete().then(() => {
                console.log('Se borró la imagen con éxito');
            }).catch(err => {
                console.log('Error al eliminar la foto:', err);
            });
        }

        if (pathImage && fileBase64) {
            // Convertir el archivo base64 a un buffer
            const buffer = Buffer.from(fileBase64, 'base64');

            const fileUpload = bucket.file(pathImage);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: 'image/jpeg', // Aquí establece el tipo de contenido adecuado para tu caso
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    }
                },
                resumable: false
            });

            blobStream.on('error', (error) => {
                console.log('Error al subir archivo a Firebase:', error);
                reject('¡Algo salió mal! No se puede subir en este momento.');
            });

            blobStream.on('finish', () => {
                const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${uuid}`);
                console.log('URL DE CLOUD STORAGE:', url);
                resolve(url);
            });

            blobStream.end(buffer);
        }
    });
};
