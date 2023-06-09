const environments = {
    development: {
        URL_PREFIX: 'http://192.168.0.220:4000',
        PLACEHOLDER: 'https://firebasestorage.googleapis.com/v0/b/signal-clone-40257.appspot.com/o/userPhotos%2Fplaceholder.png?alt=media&token=cc37f0a5-8df1-42f1-bdaa-e28e1c0e8412'
    },
    production: {
        URL_PREFIX: 'https://chops-file-server.onrender.com',
        PLACEHOLDER: 'https://firebasestorage.googleapis.com/v0/b/signal-clone-40257.appspot.com/o/userPhotos%2Fplaceholder.png?alt=media&token=cc37f0a5-8df1-42f1-bdaa-e28e1c0e8412'
    }
}

const env = environments.development // change this line as needed and import environment.js where needed
export default env