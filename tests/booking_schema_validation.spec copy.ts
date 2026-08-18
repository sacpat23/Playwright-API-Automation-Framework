import { test, expect } from "@playwright/test";
import Ajv from 'ajv';
import fs from 'fs';


function readjson(jsonFile: string) {
  return JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
}

test("Verify booking API response matches the expected schema", async ({ request }) => { 
    

    const jsonFile = readjson("testData/createBooking_api.json");
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody)


    const schema = readjson("testData/booking_schema.json");
  
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);

    expect(isValid).toBeTruthy();

})