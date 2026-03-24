import { pg } from "../../config/db/postgres";

const createProjectQuery = async (name: string, api_key: string) => {
  try {
    const res = await pg.query(
      `INSERT INTO projects(name, api_key) VALUES($1,$2) RETURNING api_key`,
      [name, api_key],
    );

    return res.rows[0];
  } catch (error) {
    console.error('create project db:', error)
  }
};

export default createProjectQuery;
