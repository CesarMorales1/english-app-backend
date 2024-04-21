import bcryptjs from "bcryptjs"

const encrypt = async (passwordToHash) => bcryptjs.hash(passwordToHash,10);
const compare = async (passwordHashed,passwordToCompare) => await bcryptjs.compare(passwordHashed,passwordToCompare);


export
{
    encrypt,
    compare
}