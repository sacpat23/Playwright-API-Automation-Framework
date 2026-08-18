/*
Create booking
get booking
update booking(token needed)
delete booking (token needed)
*/

import { test, expect } from "@playwright/test";
import fs from 'fs';


//const jsonFile = "/testdata/createBooking_api.json";
//const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));


function readJson(filePath: string) { 
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Verify end-to-end booking update flow using API chaining (end to end test)', async ({ request }) => {

    // Create Booking request

    const requestBody = readJson("testdata/createBooking_api.json");
    const post_response = await request.post("/booking", { data: requestBody });
    const post_responseBody = await post_response.json();
    console.log(post_responseBody);

    const bookingID = post_responseBody.bookingid;
    console.log("Booking ID is ", bookingID);
    

    // get Booking details 


    const get_response = await request.get(`/booking/${bookingID}`);
    const get_responseBody = await get_response.json();
    console.log(get_responseBody);



    // Create token first using token api
    const token_requestBody = readJson("testdata/token_api.json");
    const token_response = await request.post('/auth', { data: token_requestBody });
    const token_responseBody = await token_response.json();
    const token = token_responseBody.token;
    console.log("Token is ", token_responseBody)

    // update booking 
    

    const update_requestBody = readJson("testdata/updateBooking_api.json");
    const update_response = await request.put(`/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: update_requestBody
        }
    )

    const update_responseBody = await update_response.json();
    console.log(update_responseBody);


    //Delete booking 

    const delete_response = await request.delete(`/booking/${bookingID}`, {
        headers: { "Cookie" : `token=${token}`, }
    
});
    
    expect(delete_response.statusText()).toBe("Created");
    expect(delete_response.status()).toBe(201);

    console.log("booking deleted successfully ");
    })