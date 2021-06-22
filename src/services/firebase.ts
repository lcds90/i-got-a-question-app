import firebase from 'firebase/app';

// NOTE É necessário importar as utilidades que irá usar na aplicação
import 'firebase/auth';
import 'firebase/database';

// SECTION Configuração referente ao banco de dados e integração WEB
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSASGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};
// !SECTION
firebase.initializeApp(firebaseConfig);

// NOTE Para inicialização de utilidades ficarem fácil e não haver necessidade de importação a todo momento
export const auth = firebase.auth();
export const database = firebase.database();