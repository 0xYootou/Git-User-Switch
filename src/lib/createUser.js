/** @format */

const { prompt } = require("inquirer");

const trimAnswer = (answer) => {
  if(typeof answer !== 'string') {
    throw new Error('Answer must be a string')
  }

  return answer.trim()
}

async function createUser(store) {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter your git user name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your git user email",
    },
    {
      type: "input",
      name: "signingKey",
      message: "(Optional) Enter your GPG signing key",
    },
  ];

  const res = await prompt(questions);

  const users = store.get("users");

  const newUser = {
    name: trimAnswer(res.name),
    email: trimAnswer(res.email),
    signingKey: trimAnswer(res.signingKey) || null,
  };

  if (users.includes(newUser)) {
    console.log(`${res.name}:${res.email} already exists!`);
    return;
  }

  store.set("users", [newUser, ...users]);
}

module.exports = createUser;
