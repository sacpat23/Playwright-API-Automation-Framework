import { test, expect } from "@playwright/test";

import fs from 'fs';
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

test("Create Booking API test", async ({ request }) => { 


    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({min:1, max:5000});
    const depositpaid = faker.datatype.boolean();
    const checkindate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutdate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");
    const additionalneeds = "Breakfast";

   const requestBody = {
    firstname : firstname,
    lastname : lastname,
    totalprice : totalprice,
    depositpaid : depositpaid,
    bookingdates : {
        checkin : checkindate,
        checkout : checkoutdate,
    },
    additionalneeds : additionalneeds,
}


    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // validating the response body attributes

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    const booking_id = responseBody.bookingid;
    console.log("Booking ID is ", booking_id);
    

    //validating the booking details 

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
   // bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast'
    })
    
    // validating the booking dates (nested json object)

    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin, checkout: requestBody.bookingdates.checkout
    })



})