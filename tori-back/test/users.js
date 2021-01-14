const {
  deleteUser,
  insertUser,
  getUserByEmail,
  getUsers,
  deleteAllUsers,
} = require("../models/users.js");

const { v4: uuidv4 } = require("uuid");
var expect = require("chai").expect;
const bcrypt = require("bcryptjs");

const saltRounds = 10;
const correctUser = {
  id: uuidv4(),
  email: "testi_testaaja@hotmail.com",
  username: "matti555",
  name: "Matti Poika",
  password_hash: bcrypt.hash("testisalasana", saltRounds),
};
const userWithoutID = {
  email: "testi_testaaja@hotmail.com",
  username: "matti555",
  name: "Matti Poika",
  password_hash: bcrypt.hash("testisalasana", saltRounds),
};
describe("users", () => {
  beforeEach("empty db", async function () {
    await deleteAllUsers();
  });

  describe("users unit testing", () => {
    it("return empty array when db is empty ", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;
    });
    it("adding correct user adds user ", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;
      await insertUser(correctUser);
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(1);
    });
    it("adding user without id will not add it to db ", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;
      await insertUser(userWithoutID);
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(0);
    });
    it("adding user with same email will not add it to db ", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;

      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertUser({...correctUser, username: i, id: uuidv4() });
      }
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(1);
    });
    it("adding user with same id will not add it to db ", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;

      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertUser({
          ...correctUser,
          username: i,
          email: `email${i}@hotmail.com`,
        });
      }
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(1);
    });
    it("adding users with different id, email and username, will add them to db", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;

      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertUser({
          ...correctUser,
          id: uuidv4(),
          email: `test_email${i}@hotmail.com`,
          username: `test_nro:${i}`,
        });
      }
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(3);
    });
    it("adding correctUser and then searching by its name will respond", async () => {
      const users = await getUsers();
      expect(users).to.be.an("array").that.is.empty;

      await insertUser(correctUser);
      const usersAfter = await getUsers();
      expect(usersAfter).to.be.an("array").length(1);
      const response = await getUserByEmail(correctUser.email);
      expect(response).to.own.include({ username: correctUser.username });
    });
  });
});
