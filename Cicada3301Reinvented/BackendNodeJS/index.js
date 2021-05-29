const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
// getting _id of object
// const objId = mongodb.ObjectID;
const bodyParser = require('body-parser');
const crypto = require('crypto');

// password utils
// create function to random salt

// const genRandomString = (length) => {
//     return crypto
//         .randomBytes(Math.ceil(length / 2))
//         .toString('hex')
//         .slice(0, length);
// };

// const sha512 = (password, salt) => {
//     let hash = crypto.createHmac('sha512', salt);
//     hash.update(password);
//     let value = hash.digest('hex');
//     return {
//         salt: salt,
//         passwordHash: value,
//     };
// };

// const saltHashPwd = (userPwd) => {
//     let salt = genRandomString(16);
//     var passwordData = sha512(userPwd, salt);
//     return passwordData;
// };

// let checkHashPwd = (userPwd, salt) => {
//     let passwordData = sha512(userPwd, salt);
//     return passwordData;
// };

// creating instance of express :)
const app = express();
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const main = async () => {
    const url =
        'mongodb+srv://user1:user1@cluster0.rwdpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const client = await MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: false,
        
    });

    try {
        await client.connect();
        // Connect to the MongoDB cluster
        // await client.connect();
        console.log('MongoDB connected :)');
        // app.post('/register', (req, res, next) => {
        //     const body = req.body;
        //     console.log(body);
        
        
        await listDatabases(client)
        await createListing(client, {
            'lname':"metkel",
            'fname':'harsh'
        });
        app.get('/', (req, res) => {
            console.log('hello');
        });
        app.post('/', async (req, res) => {
            let data = req.body;

            console.log(data);
            if (!data) {
                return res
                    .status(400)
                    .json({ success: false, msg: 'please provide uname' });
            } else {
                res.status(201).json({ success: true, uname: data.uname });
                await createListing(client, data);
            }
        });

        //     // console.log('inside post');
        //     // let post_data = req.body;
        //     // let plain_pwd = req.password;
        //     // let hash_data = saltHashPwd(plain_pwd);
        //     // let password = hash_data.passwordHash;
        //     // let salt = hash_data.salt;
        //     // let name = post_data.name;
        //     // let email = post_data.email;

        //     // const insertJson = {
        //     //     'email': email.toString(),
        //     //     'name': name.toString(),
        //     //     'password': password.toString(),
        //     //     'salt': salt.toString(),
        //     // };
        //     // console.log(insertJson);
        //     // client
        //     //     .db('dbwithnodejs')
        //     //     .collection('user')
        //     //     .find({ email: email })
        //     //     .count((err, num) => {
        //     //         if (num) {
        //     //             res.json({ success: true });
        //     //             console.log('Email already exists');
        //     //         } else {
        //     //             client
        //     //                 .db('dbwithnodejs')
        //     //                 .collection('user')
        //     //                 .insertOne(insertJson, (err, res) => {
        //     //                     res.json('Successful registration', {
        //     //                         success: true,
        //     //                     });
        //     //                     console.log('Successful registration');
        //     //                 });
        //     //         }
        //     //     });
        //     // createListing(client, );
        // });

        // app.listen(5000, () => {
        //     console.log('server listening on port 5000');
        // });

        // Make the appropriate DB calls
    } catch (e) {
        console.error(e);
    } 
    // finally {
    //     // Close the connection to the MongoDB cluster
    //     await client.close();
    // }
};

main().catch(console.error());

const createListing = async (client, newListing) => {
    const result = await client
        .db('dbwithnodejs')
        .collection('user')
        .insertOne(newListing);
    console.log(
        `New listing created with the following id: ${result.insertedId}`
    );
};

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


         app.listen(5000, () => {
            console.log('server listening on port 5000');
        });
