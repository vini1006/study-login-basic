const path = require('path')
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile)
const writeFilePromise = util.promisify(fs.writeFile)

module.exports = (express) => {
    const userListStoragePath = path.resolve() + "/src/userInfo/user.json";
    const router = express.Router(); 
    const getUserList = async () => {
        const list = await readFilePromise(userListStoragePath, { encoding: 'utf-8'});
        console.log(list);
        console.log(JSON.parse(list))
        return JSON.parse(list);
    }

    router.get("/login", (req, res) => {
        //로그인 페이지
        res.status(200).render("login/login")
    });

    router.post("/login", (req, res) => {
        //로그인
        const {name, id, password} = req.body;
        console.log(name, id, password)

        const userList = await getUserList();
        if(userList[id]?.password === password) {
            return res.status(200).send({
                login_status : "success"
                , description: "Yeah"
            })
        } else {
            return res.status(200).send({
                login_status : "fail"
                , description: "info mismatch"
            })
        }
    });

    router.get("/sign-up", async (req, res) => {
        //회원가입 페이지
        res.status(200).render("login/signup");
    });

    router.post("/sign-up", async (req, res) => {
        //회원가입
        const { userName, id, password } = req.body;
        const userList = await getUserList();

        if(userList[id]) return res.status(200).send({
            sign_up_status: "fail"
            , description: "user exists"
        });

        userList[id] = {
            name: userName
            , uid: id
            , password: password
        }

        await writeFilePromise(userListStoragePath, JSON.stringify(userList), 'utf-8')

        return res.status(200).send({
            sign_up_status: "success"
            , description: "sign up success"
        });
    });

    return router;
}