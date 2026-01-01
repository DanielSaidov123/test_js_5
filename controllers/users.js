export const createuser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(409).json({
        message: "No password or username entered.",
      });
    }
    console.log(req.body.username);
    
    const newuser = {
    username:req.body.username,
    password: req.body.password,
    encryptedMessagesCount:0,
    createdAt: new Date(),
    };
    const prodectColection = await req.mongodbCone.collection("users");
    const result = await prodectColection.insertOne(newuser);

    const user = await prodectColection.findOne({ _id: result.insertedId });
    res.status(201).json({ msg: "success", data: user });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A todo with this username already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
