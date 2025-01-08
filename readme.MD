on page of grapgql on local host to do function :

query GetHello {
  hello
}

mutation CreateUser {
  createUser(input: {name: "Shady", password: "jjjj", gmail: "jjj@dd.ccc"}) {
    name
    gmail
  }
}

query ShowAllUsers {
  showAllUsers{
    id,
    name,
    gmail,
    password
  }
}

mutation deleteone{
  deleteUser(id:"677e7cb1f55b27d29fcd7b96")
}