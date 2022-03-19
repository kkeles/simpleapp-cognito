import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_jO41ax5Cp",
    ClientId: "628h1lmbn9th4cq5kg4prv5lm"
}

export default new CognitoUserPool(poolData);