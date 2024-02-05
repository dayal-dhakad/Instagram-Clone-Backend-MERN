

exports.home = async(req, res)=>{
    try{
        console.log("api hit")
        return res.status(200).json({
            success: true,
            message: "home api hit"
        });
    }
    catch(error){
        console.log(error)
        return res.status(404).json({
            success: false,
            message: "home error"
        });
    }
}