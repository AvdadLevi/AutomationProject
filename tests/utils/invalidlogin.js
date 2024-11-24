//fill in combinatons
export const fillCombinations = [
    { username: "standard_user", password: "wrong_password", expectedError: "Username and password do not match any user in this service" },  // username correct, password incorrect
    { username: "wrong_user", password: "secret_sauce", expectedError: "Username and password do not match any user in this service" }, // username incorrect, password correct
    { username: "wrong_user", password: "wrong_password", expectedError: "Username and password do not match any user in this service" }  // username incorrect, password incorrect
];
  
export const blankcombinations1 = [
  { username: '', password: "secret_sauce", expectedError:"Epic sadface: Username is required"},  //username blanck, password correct
  {username: '', password: '', expectedError:"Epic sadface: Username is required"}  //username blanck, password blanck
]

export const blankcombinations2 = [
  { username: 'standard_user', password: '', expectedError: "Epic sadface: Password is required"}  //username correct, password blanck
]