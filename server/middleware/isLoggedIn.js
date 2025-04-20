import  jwt  from "jsonwebtoken"

 const isLoggedIn = async(req, res, next) => {
try { 
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message: "You are not logged in."})
    }
    const check = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    if(!check){
        return res.status(401).json({
            success:false,
            message: "You are not logged in."})  
          }
     req.body.id = check.id ;// id jo mene token sign krne samay diya tha
    next();
       

} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Something went wrong with the authentication"
    })
}
}
export default isLoggedIn