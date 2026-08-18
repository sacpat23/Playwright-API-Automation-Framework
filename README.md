# Playwright API Automation Framework

**Playwright | TypeScript | REST API | API Chaining | CRUD | Authentication | Schema Validation | Data-Driven Testing | CI/CD**

## Overview

This project is a REST API automation framework built using Playwright and TypeScript.

The framework demonstrates API testing concepts including CRUD operations, authentication,
API chaining, dynamic test data, request/response validation, and schema validation.

The Restful Booker API is used as the application under test.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API
- JSON
- Git / GitHub
- Playwright HTML Reporter

## API Test Coverage

- Create Booking
- Get Booking by ID
- Get Booking by Guest Name
- Update Booking
- Delete Booking
- Authentication / Token Generation
- API Chaining
- Dynamic Test Data
- Status Code Validation
- Response Validation
- Schema Validation

## API Chaining

The framework demonstrates an end-to-end API chaining workflow where the
response from one API is used as input for the next API.

### Booking Update Flow

POST /booking -> Extract Booking ID -> POST /auth -> Extract Authentication Token -> PUT /booking/{bookingId} -> Validate Updated Booking


## Project Structure

```text
playwright-api-automation/
│
├── tests/
│   ├── authentication.spec.ts
│   ├── booking_api_chaining.spec.ts
│   ├── booking_create.spec.ts
│   ├── booking_create_dynamic.spec.ts
│   ├── booking_delete.spec.ts
│   ├── booking_get_by_id.spec.ts
│   ├── booking_get_by_name.spec.ts
│   ├── booking_update.spec.ts
│   └── booking_schema_validation.spec.ts
│
├── testData/
│   ├── auth_token.json
│   ├── booking_create.json
│   └── booking_update.json
│
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md


Prerequisites

Before running the project, please installed following:

Node.js (LTS)
npm
Git
Installation

1. Clone the Repository
git clone <your-github-repository-url>
cd playwright-api-automation

2. Install Project Dependencies

Install all dependencies defined in package.json:

npm install

3. Install Playwright Browsers
npx playwright install
Running Tests
Run All Tests
npx playwright test
