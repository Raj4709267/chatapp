const { UserModel } = require("../Models/user.model")


const authorization= (permittedrole)=>{

    return async (req,res,next)=>{

        let user=await UserModel.findOne({_id:req.body.userId})
        console.log(user)
        if(permittedrole.includes(user.role)){
            next();
        }else{
            res.status(404).json({message:"user not authorized"});
        }


    }

}

module.exports={authorization}