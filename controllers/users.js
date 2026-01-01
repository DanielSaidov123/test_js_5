export const createuser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(409).json({
        message: "No password or username entered.",
      });
    }
    
    const newuser = {
    username:req.body.username,
    password: req.body.password,
    encryptedMessagesCount:0,
    createdAt: new Date(),
    };
    const prodectColection = await req.mongodbCone.collection("users");
    const result = await prodectColection.insertOne(newuser);

    const user = await prodectColection.findOne({ _id: result.insertedId });
    res.status(201).json({  id: user._id ,username: user.username});
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A username with this username already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};


export const getUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({
        message: "No password or username entered.",
      });
    }
    const prodectColection = await req.mongodbCone.collection("users");
    const user = await prodectColection.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(404).json({ msg: "user name not found" });
      return;
    }
    if (user.password !== req.body.password) {
      res.status(404).json({ msg: "password is not good" });
      return;
    }
    
    
    res.status(201).json({ username: req.body.username, encryptedMessagesCount: user.encryptedMessagesCount });
     
    
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A username with this username already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
