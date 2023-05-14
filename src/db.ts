import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  username: "postgres",
  password: "5664",
  database: "postgres",
  host: "localhost",
  dialect: "postgres",
});

const dbConn = {
  testConnection: async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
};

export default dbConn;
