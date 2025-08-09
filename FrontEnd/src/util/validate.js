// Validate function only return true/false or throw errors not res.send

const validateUserSignup = (req) => {
    const {firstName, lastName, email, password, age, gender, skills} = req.body;
    if (firstName.length<2 && firstName.length>20){
        throw new Error("FirstName should be greater than 2 letters and less than 20 letters.")
    }

    if (skills.length < 1) throw new Error("Please enter atleast one skill.")
}

const validateEditFields = (req) => {
    const EditFieldsAllowed = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"]

    const isAllowedFields = Object.keys(req.body).every((item) => EditFieldsAllowed.includes(item))

    return(isAllowedFields);
}

const validatePassword = (req) => {
    // change password is only allowed if the user gives the current password 
    
}

module.exports = {
    validateUserSignup,
    validateEditFields
}