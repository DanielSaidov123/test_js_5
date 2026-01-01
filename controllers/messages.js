import q  from "../utils/query.js";

export const encrypt = async (req, res) => {
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
        
    res.status(201).json({id:messag.id,cipherType :req.body.cipherType,encryptedText: messag.encrypted_text} );
     };
    
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


export const decrypt = async (req, res) => {
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
        const messag= await q.getById(req,req.body.messageId)

        const reversedStr =messag.encrypted_text.split('').reverse().join('').toLowerCase();
    
    res.status(201).json({ id: req.body.messageId, decryptedText: reversedStr });
     
    
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "error",
        data: null,
        message: "A usernsme with this username already exists",
      });
    }
    res.status(500).json({ msg: "error: " + err.message, data: null });
  }
};
