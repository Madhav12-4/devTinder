const adminAuth = (req,res,next) => {
    const token = "cndjs";
    console.log("Wahi hain surate phir bhi wahi mai hun wahi tum ho magar khoya hua hu main")
    if(token === "xyz"){
        req.body = {
            padhai: "Bahut kuch paadhna hai abhi idhar udhar nahi kar sakte",
            kya: "Matlab projects revise karne hain, dsa karte rehna hai ",
            aur:"contest dete rehna hai jo padha rahe hain keval lecture nahi dekhna hai",
            aur: "Agar samay mile to dostoevesky short stories and amazon leeter to shareholders sama alta blogs and reviews karmayog"
        }
        next();
    }
    else{
        res.status(401).send("Is Nadi ki dhaar se thandi hawa aati to hai naav jarjar hi sahi lehron se takrati to hai")
    }
    
}

const userAuth = (req,res,next) => {
    const token = "xyz";
    console.log("Wahi hain surate phir bhi wahi mai hun wahi tum ho magar khoya hua hu main")
    if(token === "xyz"){
        req.body = {
            padhai: "Bahut kuch paadhna hai abhi idhar udhar nahi kar sakte",
            kya: "Matlab projects revise karne hain, dsa karte rehna hai ",
            aur:"contest dete rehna hai jo padha rahe hain keval lecture nahi dekhna hai",
            aur: "Agar samay mile to dostoevesky short stories and amazon leeter to shareholders sama alta blogs and reviews karmayog"
        }
        next();
    }
    else{
        res.status(401).send("Is Nadi ki dhaar se thandi hawa aati to hai naav jarjar hi sahi lehron se takrati to hai")
    }
    
}

module.exports = {
    adminAuth,
    userAuth,
}