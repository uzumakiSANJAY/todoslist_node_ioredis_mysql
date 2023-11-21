const example =() =>{
    try {
        return `SELECT * from Persons;`
    } catch (error) {
        console.log(error);
        throw new Error
    }
}

module.exports = {example}