import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";

const sequelize = new Sequelize({
  username: "postgres",
  password: "postgres",
  database: "book_database",
  host: "localhost",
  dialect: "postgres",
});

sequelize.addModels([User]);

const dbConn = {
  getConnection: () => {
    try {
      sequelize.authenticate().then(() => console.log("Session established"));
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    return sequelize;
  },
};

export default dbConn;
