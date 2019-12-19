import db from '../config';

// Get all the users from the Database
export const getAllUsers = async (req, res) => {
  // connect to a postgreSQL server.
  const client = await db.connect();
  // SELECT every thing from users table in the database
  const findAll = 'SELECT * FROM users';
  try {
    // querying or requesting information from the database
    const response = await client.query(findAll);
    if (response.rows.length === 0) {
      return res.status(200).json({
        status: 200,
        message: 'No user at the moment',
      });
    }
    return res.status(200).json({
      status: 200,
      data: response.rows, // All the users from the DB
    });
  } catch (err) {
    console.log('>>>>>>>>', err);
    return res.status(500).json({
      status: 500,
      error: 'Oops! something went wrong, Please try again',
    });
  } finally {
    client.release();
  }
};
