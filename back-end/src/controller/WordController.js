
const getAllWord = (req,res) =>{
    return res.send("get all word")
}

const addNewWord = (req,res) =>{
    return res.send("add new word")
}

const editWord = (req,res) =>{
    return res.send("edit word")
}

module.exports = {
    getAllWord: getAllWord,
    addNewWord: addNewWord,
    editWord: editWord
}