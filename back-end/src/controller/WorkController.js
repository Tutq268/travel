
let addNewWork = (req,res)=>{
    console.log(req.body)
    return res.json({
        result: "ok",
        message: "ok",
        data: null
    })
}

module.exports ={
    addNewWork:addNewWork
}