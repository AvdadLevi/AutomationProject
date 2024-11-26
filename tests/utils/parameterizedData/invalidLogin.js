export const lockedOutUser = [
    // User this in the test case Locked-Out User
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
]

//fill in combinations
export const invalidUsersDetails = [
    {
        username: 'standard_user',
        password: 'wrong_password',
        expectedError:
            'Username and password do not match any user in this service',
    }, // username correct, password incorrect
    {
        username: 'wrong_user',
        password: 'secret_sauce',
        expectedError:
            'Username and password do not match any user in this service',
    }, // username incorrect, password correct
    {
        username: 'wrong_user',
        password: 'wrong_password',
        expectedError:
            'Username and password do not match any user in this service',
    }, // username incorrect, password incorrect
    {
        username: '',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username is required',
    }, //username blank, password correct
    {
        username: '',
        password: '',
        expectedError: 'Epic sadface: Username is required',
    }, //username blank, password blank
    {
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required',
    }, //username correct, password blank
]
