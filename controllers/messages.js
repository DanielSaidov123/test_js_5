import q  from "../utils/query.js";

export const createmessage = async (req, res) => {
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
    await prodectColection.updateOne(
      { username: user.username },
      { $set: { encryptedMessagesCount: user.encryptedMessagesCount+1 } }
    );

    if(req.body.cipherType=='reverse'){
        const reversedStr = req.body.message.split('').reverse().join('').toUpperCase();
        const mss = await q.create(req,{username: req.body.username, cipher_type:req.body.cipherType, encrypted_text: reversedStr })
        const messag= await q.getById(req,mss)
        
    res.status(201).json({ msg: "success", data: messag });
     };
    
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
