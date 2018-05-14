var bcrypt = require("bcryptjs");
var spicedPg = require("../node_modules/spiced-pg");
const hashPassword = require("../config/hashPassword").hashPassword;

var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:funky:chicken@localhost:5432/mapappdb");
}
// ************** REGISTRATION *************
exports.saveUser = (first, last, email, password) => {
    return db.query(
        "INSERT INTO users (first, last, email, pass) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, email, password]
    );
};

// ************** LOGIN *************
//this used to be getUserInfo
exports.getUserInfoByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};
exports.getUserInfoById = (id) => {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
};
exports.checkForUser = (email) => {
    return db.query("SELECT id FROM users WHERE email=$1", [email]);
};
exports.checkPassword = (
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) => {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};

// ******* INSERT IMAGES *******
exports.updateProfilepic = (profilepic, email) => {
    return db.query(
        `UPDATE users
                     SET profilepic = $1
                     WHERE email = $2
                     RETURNING *
                     `,
        [profilepic, email]
    );
};
// ******* INSERT BIO *******

exports.updateUserInfo = (id, first, last, email, bio, pass) => {
    if (pass) {
        return hashPassword(pass)
            .then((hashedPassword) => {
                return db.query(
                    `UPDATE users
                SET first = $2, last=$3, email=$4, bio=$5, pass=$6
                WHERE id = $1
                RETURNING *
                `,
                    [id, first, last, email, bio, hashedPassword]
                );
            })
            .catch((err) => {
                console.log("err when hashing in db", err);
            });
    } else {
        return db.query(
            `UPDATE users
                         SET first = $2, last=$3, email=$4, bio=$5
                         WHERE id = $1
                         RETURNING *
                        `,
            [id, first, last, email, bio]
        );
    }
};
// ******* CHECK FRIENDSHIP STATUS ********
exports.checkFriendshipStatus = (requester_id, receiver_id) => {
    return db.query(
        `SELECT requester_id, receiver_id, status FROM friendships
                     WHERE (requester_id = $1 and receiver_id = $2)
                     OR (receiver_id = $1 and requester_id = $2)
                     ORDER BY id DESC
                    `,
        [requester_id, receiver_id]
    );
};

exports.sendFriendRequest = (requester_id, receiver_id, status) => {
    return db.query(
        `INSERT INTO friendships (requester_id, receiver_id, status)
                    VALUES ($1, $2, $3) RETURNING *
                     `,
        [requester_id, receiver_id, status]
    );
};

exports.updateFriendshipStatus = (requester_id, receiver_id, status) => {
    // console.log('inside the database requester_id, receiver_id, status',requester_id, receiver_id, status);
    return db.query(
        `UPDATE friendships
                    SET status = $3
                    WHERE (requester_id = $1 and receiver_id = $2)
                    OR (receiver_id = $1 and requester_id = $2)
                    RETURNING *
                     `,
        [requester_id, receiver_id, status]
    );
};

exports.getFriends = (id) => {
    console.log("inside get friends");
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 or requester_id = $1) AND status = 3
        ORDER BY id DESC
        `,
        [id]
    );
};
// *********** PART 7 : List Friends ***********

exports.getFriendsAndWannabes = (id) => {
    console.log("inside get friends and wannabes..");
    return db.query(
        `
        SELECT users.id, status, first, last, profilepic
            FROM friendships
            JOIN users
            ON (status = 1 AND receiver_id = $1 AND requester_id = users.id)
            OR (status = 3 AND receiver_id = $1 AND requester_id = users.id)
            OR (status = 3 AND requester_id = $1 AND receiver_id = users.id)
            ORDER BY status DESC
                    `,
        [id]
    );
};

// ********* PART 8 *************

exports.getUsersByIds = (array) => {
    return db.query(
        `
        SELECT id, first, last, profilepic FROM users
        WHERE id = ANY($1)`,
        [array]
    );
};
////////// map stuff //////////////
exports.selectCategory = (array) => {
    return db.query(`SELECT * FROM pins WHERE category = ANY($1)`, [array]);
};

exports.insertNewPin = (id, description, title, catagory, lat, lng, color) => {
    return db.query(
        `INSERT INTO pins (user_id,  description, title,category, lat, lng, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [id, description, title, catagory, lat, lng, color]
    );
};
exports.getMarkerInfo = (id) => {
    return db.query(`SELECT * FROM pins WHERE user_id=$1`, [id]);
};
exports.saveMarkerImage = (url, id) => {
    return db.query(`UPDATE pins SET url = $1  WHERE id = $2 RETURNING *`, [
        url,
        id
    ]);
};
