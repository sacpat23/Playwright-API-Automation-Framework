import { test, expect } from "@playwright/test";

import fs from 'fs';

test("Verify POST /booking creates a booking successfully", async ({ request }) => { 

    const jsonFile = "testData/createBooking_api.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));


    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    const booking_id = responseBody.bookingid;
    console.log("Booking ID is ", booking_id);
    

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        // bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    })
    

    expect(booking.bookingdates).toMatchObject({
        checkin: '2018-01-01', checkout: '2019-01-01'  
    })
})