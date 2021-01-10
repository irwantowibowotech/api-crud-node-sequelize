"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Irwanto",
          address: "Gunungkidul",
          email: "irwantoadmin@yahoo.com",
          password: bcrypt.hashSync("irwantoadmin", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rina Pratama",
          address: "Bali",
          email: "rinapratama@yahoo.com",
          password: bcrypt.hashSync("rinapratama", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
