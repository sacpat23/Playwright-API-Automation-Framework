import { test, expect } from "@playwright/test";

import fs from "fs";

test("Verify GET /booking returns bookings for a valid guest name", async ({ request }) => { 

    const jsonFile = "testData/createBooking_api.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));


    const response = await request.post("/booking", { data: requestBody });

    const responseBody = await response.json();
    const bookingID = responseBody.bookingid;
    console.log("booking id is ", bookingID);

    const firstName = await responseBody.booking.firstname;
    console.log("First Name is ", firstName);
    const lastName = await responseBody.booking.lastname;
    console.log("Last Name is ", lastName);
    console.log("=========================")



//get Booking ID details

    //const responseData = await request.get(`/booking?firstname=${firstName}}&lastname=${lastName}`);        
    const responseData = await request.get("/booking", { params: {firstName, lastName} });        

    const get_respponseBody = await responseData.json();

    console.log(get_respponseBody);
    expect(responseData.ok()).toBeTruthy();
    expect(responseData.status()).toBe(200);

    expect(get_respponseBody.length).toBeGreaterThan(0);

    for (const item of get_respponseBody) { 

        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);


    }
    

})


