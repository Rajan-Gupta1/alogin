/* eslint-disable */
import Amplify, { Auth } from 'aws-amplify';
// Amplify.Logger.LOG_LEVEL = 'ERROR'
const aws_configure = {
    Auth: {
        "region": "us-east-1",
        "userPoolId": "us-east-1_xxxxxxxxxx",
        "userPoolWebClientId": "xxxxxxxxxxxxxxxxxxx",
        mandatorySignIn: true,
        cookieStorage: {
            domain: 'dhr6l0myaqiv0.cloudfront.net',
            path: '/',
            expires: 365,
            sameSite: "strict",
            secure: true
        },
    },
    "API" : {
        endpoints: [
            {
                name: "userAdminAPI",
                endpoint: "https://an01qaa7s4.execute-api.us-east-1.amazonaws.com/Prod",
                custom_header: async () => { 
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
                }
            }

        ]
    }
};

 
export default aws_configure;
