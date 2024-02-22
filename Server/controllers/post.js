import {db} from "../db.js"
import jwt from "jsonwebtoken";

export const getAllPosts=(req,res)=>{

    const getAllPostQuery = req.query.cat ? "SELECT * FROM posts WHERE category=?":"SELECT * FROM posts";
    db.query(getAllPostQuery,[req.query.cat],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
}


export const getSinglePost=(req,res)=>{
    
    const q =  "SELECT `username`,`title`,`desc`,p.img,`category`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data[0])
    })
}


export const addPost=(req,res)=>{


        const postId = req.params.id;
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            req.body.uid,
            req.body.category
        ]

        const q ="INSERT INTO `posts` ( `title`, `desc`, `img`, `date`, `uid`, `category`) VALUES (?)"
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(403).json(err)

            return res.json("Post Added")


        // })
    })
}


export const updatePost=(req,res)=>{

console.log("-----> UPDATE POST <-----");
const token = req.cookies.access_token
console.log("----->",token);

    if(!token) return res.json("Not Authenticated");
    jwt.verify(authToken,"jwtkey",(err,userInfo)=>{
        if(err) return console.log("JWT Token is Not Valid")
        console.log("token genuine");
    })


    const postId = req.params.id;
    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,

    ]

    const q ="UPDATE posts SET `title`=?, `desc`=?, `img`=?  WHERE id=?"
    db.query(q,[...values,postId],(err,data)=>{
        if(err) return res.status(403).json(err)
        return res.json("Post Updated")

})
}


export const deletePost=(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.json("Not Authenticated");
    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json("JWT Token is Not Valid")

        const postId = req.params.id;
        const q ="DELETE FROM posts WHERE `id`=? AND `uid`=?"

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("You can delete only your post !")

            return res.json("Post Deleted")


        })
    })
}