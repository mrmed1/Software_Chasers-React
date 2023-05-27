import {TOKEN_KEY} from "../../../src/Config/config";
import jwt from "react-jwt";
function getUserIdFromToken(token){
    console.log('token :',token)
    const decodedToken =jwt.decodeToken(token);
    console.log('token decoded :',decodedToken._id);
    const userId = decodedToken._id;
    console.log(userId)
    return userId;
};
describe('Test API Crud Summer Intern', () => {
    let token;
    let userId;
    beforeEach(() => {
        cy.loginMed();
        cy.wait(1500);
        cy.window().then((win) => {
            token = win.localStorage.getItem(TOKEN_KEY);
            userId = getUserIdFromToken(token);
        });
    })
    it('should Add Summer Intern', function () {
       console.log(userId)

    });
})