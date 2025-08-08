const validateUserSignup = (req) => {
    const {firstName, lastName, email, password, age, gender, skills} = req.body;
    if (firstName.length<2 && firstName.length>20){
        throw new Error("FirstName should be greater than 2 letters and less than 20 letters.")
    }

    if (skills.length < 1) throw new Error("Please enter atleast one skill.")
}

module.exports = {
    validateUserSignup
}