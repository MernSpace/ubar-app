const bcrypt = require('bcrypt');

const UserCreateService = async (postBody, DataModel) => {
    try {
        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(postBody.password, saltRounds);

        // Replace the plain text password with the hashed password
        const userDataToSave = {
            ...postBody,
            password: hashedPassword
        };

        // Create user with hashed password
        let data = await DataModel.create(userDataToSave);

        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error.toString() }
    }
}
module.exports=UserCreateService