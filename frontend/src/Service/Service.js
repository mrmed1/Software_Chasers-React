import axios from '../Helpers/interceptors';
const jwt = require('react-jwt');


export function getUserIdFromToken(token){
    const decodedToken =jwt.decodeToken(token);
    console.log('token decoded :',decodedToken._id);
    const userId = decodedToken._id;
    console.log(userId)
    return userId;
};

export async function changeUserPassword(token, currentPassword, newPassword) {
    const userId = getUserIdFromToken(token);
    const data = { currentPassword, newPassword, userId };
    try {
        const response = await axios.post('/admin/change-password', data);
        if (response.status === 200) {
            return 'Success';
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};
