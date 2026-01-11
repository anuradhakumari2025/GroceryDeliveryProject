import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
  const {token} = req.cookies;
  if(!token){
    return res.json({success:false ,message : "NOT AUTHORIZED"})
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(req.body)
    if(tokenDecode.id){
      req.userId = tokenDecode.id;
      // console.log(tokenDecode.id)
    }else{
      return res.json({success:false ,message : "NOT AUTHORIZED"})
    }
    next()
  } catch (error) {
    console.error(error);
    res.json({success:false ,message : error.message})
  }
}

export default authUser