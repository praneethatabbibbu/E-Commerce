const authouriesUser=function(req,res,next){
    const user=req.user
    const isAdmin=user.isAdmin
    if(isAdmin){
        next()
    }else{
        res.status('404').send({notice:'unauthouries action'})
    }
}

module.exports={authouriesUser}