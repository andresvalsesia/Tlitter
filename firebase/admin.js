const admin = require("firebase-admin");

const serviceAccount = require("../tlitter-f6425-firebase-adminsdk-9jv7i-3a2fd5e4b6.json");

try{
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
catch(e){
  
}



export const firestore=admin.firestore()