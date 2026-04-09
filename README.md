# Smart Health Record Encryption System (MERN)

A secure healthcare management platform with AES-256 encryption.

## Features
- **Patient Dashboard**: Upload health records which are automatically hashed and AES-encrypted before being stored in MongoDB.
- **Doctor Dashboard**: Access patient records using their unique ID. Data is decrypted in real-time for authorized medical professionals.
- **Security**: JWT Authentication, Bcrypt password hashing, and SHA-256 integrity checks.

## Tech Stack
- **Frontend**: React (Vite), CSS3, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Encryption**: Crypto-JS (AES).

## Setup Instructions

### 1. Backend Setup
1. Open a terminal in `/server`.
2. Ensure you have MongoDB running locally at `mongodb://localhost:27017/smart-health`.
3. Run `npm install`.
4. Run `npm run dev`.

### 2. Frontend Setup
1. Open another terminal in `/client/app`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the displayed URL (usually `http://localhost:5173`).

## Usage Guide
1. **Register as a Patient**.
2. **Login** and go to the dashboard.
3. **Upload a record** (e.g., "Blood Report", Data: "Glucose: 90mg/dL").
4. **Copy your User ID** from the dashboard (visible in the database or after registration).
5. **Register as a Doctor**.
6. **Login** and paste the Patient's ID into the search bar to view their decrypted records.
