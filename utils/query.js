const create = async (req, taskData) => {
  console.log("fewf");
  console.log(taskData);

  const { username, cipher_type, encrypted_text } = taskData;
  console.log(username);

  const [result] = await req.mysqlDBConn.query(
    "INSERT INTO messages (username, cipher_type, encrypted_text ) VALUES (?, ?, ?)",
    [username, cipher_type, encrypted_text]
  );
  return result.insertId;
};

const getById = async (req, id) => {
  const [tasks] = await req.mysqlDBConn.query("SELECT * FROM messages WHERE id = ?", [
    id,
  ]);
  console.log(tasks);
  
  return tasks[0];
};

export default {
  create,
  getById,
};
