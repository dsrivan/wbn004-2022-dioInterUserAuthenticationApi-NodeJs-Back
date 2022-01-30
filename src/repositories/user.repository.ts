import db from "../db";
import DatabaseError from "../models/errors/DatabaseError.model";
import User from "../models/user.model";

const objQueries = {
  findAllUsers: `SELECT uuid, username FROM application_user`,
  findById: `SELECT uuid, username FROM application_user WHERE uuid = $1`,
  insert: `INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'my_salt')) RETURNING uuid`,
  update: `UPDATE application_user SET username = $1, password = crypt($2, 'my_salt') WHERE uuid = $3`,
  remove: `DELETE FROM application_user WHERE uuid = $1`,
};

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = objQueries.findAllUsers;

    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = objQueries.findById;

      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;

      return user;
    } catch (error) {
      throw new DatabaseError("Erro na consulta por ID", error);
    }
  }

  async create(user: User): Promise<string> {
    const query = objQueries.insert;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(query, values);

    const [newUser] = rows;

    return newUser.uuid;
  }

  async update(user: User): Promise<void> {
    const query = objQueries.update;

    const values = [user.username, user.password, user.uuid];
    await db.query(query, values);
  }

  async remove(uuid: string): Promise<void> {
    const query = objQueries.remove;

    const values = [uuid];

    await db.query(query, values);
  }
}

export default new UserRepository();
