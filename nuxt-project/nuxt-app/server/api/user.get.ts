const query = {
  // give the query a unique name
  text: 'SELECT * FROM users',
  // SELECT column FROM table
  // ORDER BY RAND()
  // LIMIT 1
};

export default defineEventHandler(async (event) => {
  try {
    const res = await event.context.postgres.query(query);
    console.log(res.rows);
    return res.rows;
  } catch (e) {
    console.log(`> books -> get: error = ${e}`);
  }
  return [];
});