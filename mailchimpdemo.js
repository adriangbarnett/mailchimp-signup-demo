/*
    Summary:    Regitser a user with mailchimp
    Author:     adriangbarnett@gmail.com
    Update:     22.08.23

    Mailchimp docs:  https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/

    DEMO REST POST REQUEST:

        POST http://localhost:3000/mailchimp-signup
        Content-Type: application/json

        {
            "update_existing": true,
            "email": "testuser24@mail.com",
            "status": "subscribed",
            "firstName": "firstName10",
            "lastName": "lastName10",
            "birthday": "12/31",
            "address": {
                "addr1": "123 Happy street",
                "city": "Salisbury",
                "state": "Wiltshire",
                "zip": "SPX 3XX"
            },
            "ip_signup": "217.0.0.0",
            "tags": ["tagOne", "tagTwo"]
        }

*/

const express = require('express');
const router = express.Router();
module.exports = router;

// for: mailchimp
const http = require("http");
const request = require("request");


// sign up to mail chimp
router.post("/mailchimp-signup", async (req, res) => {

    try {

        const newData = req.body;

        // create data to send
        var data = {
            members: [
                {
                    update_existing: newData.update_existing,
                    email_address: newData.email,
                    status: newData.status,
                    merge_fields: {
                        FNAME: newData.firstName,
                        LNAME: newData.lastName,
                        BIRTHDAY: newData.birthday,
                        ADDRESS: {
                            addr1: newData.address.addr1,
                            city: newData.address.city,
                            state: newData.address.state,
                            zip: newData.address.zip
                        }
                    },
                    tags: newData.tags
                }
            ]
        };

        // convert data to send into string
        const jsonData = JSON.stringify(data);
        
        // Set the request options and attach jsonData
        const options = {
            url: process.env.MAILCHIMP_MAIL_URL,
            method: "POST",
            headers: {
                Authorization: `auth ${process.env.MAILCHIMP_AUTH}`
            },
            body: jsonData
        }

        // store incomeing response data
        let resData = [];

        // send the request
        request(options).on('data', chunk => {
            // wait while data is being sent back....
            resData.push(chunk);
        })

        // response ended
        .on('end', () => { 

            // convert response to json format
            const resJson = JSON.parse(resData);

            if (resJson) {

                // validate the response
                if (resJson.errors) {
                    if (resJson.errors.length > 0) {
                        console.log("Mailchimp request failed");
                    } else {
                        console.log("Mailchimp request success");
                    }
                }

                // return mailchimp response as json 
                console.log(resJson)
                return res.send(resJson);

            } else {

                return res.send({code: 999, message: "resJson is empty"});
            }


            
        })

        // oops
        .on('error', err => {
            console.log({err: err.message});
            return res.send(err);
        });

    } catch (e) {
        console.log({code: 500, message: "mailchimp signup exception", error: e.stack});
        res.status(500).json({code: 500, message: "mailchimp signup exception", error: e.stack});
    }

});
