# Kairos Backend

## 📖 Description

Kairos Backend is a **NestJS with TypeScript** REST API that enables image processing and task querying. The API allows:

- Uploading an image and generating variants in different resolutions.
- Querying the processing status of an image and its associated "price."
- Data persistence in **MongoDB**.
- Automated testing.

---

## 🚀 Technologies Used

- **NestJS** with **TypeScript**
- **MongoDB** (using `mongoose` for modeling)
- **Sharp** for image processing
- **Jest** and **Supertest** for unit and integration testing
- **ESLint and Prettier** for linting and code formatting

---

## 📂 Project Structure

```ini
kairos-backend/
├── src/
│   ├── modules/            # Main modules
│   ├── common/             # Global configurations and utilities
│   ├── main.ts             # Application entry point
│   ├── app.module.ts       # NestJS root module
├── test/                   # Integration tests
├── scripts/                # Database initialization scripts
├── .env                    # Environment variables
```

---

## 📦 Installation

1. **Clone the repository**

```sh
git clone https://github.com/your-username/kairos-backend.git
cd kairos-backend
```

2. **Install dependencies**

```sh
pnpm install
```

3. __Set up environment variables__ (Create a `.env` include PORT, MONGO_URI and MONGO_URI_TEST).

4. **Run the script**

```sh
npx ts-node scripts/seed.ts
```

5. **Run the application in development mode**

```sh
pnpm run start
```

---

## 📌 Endpoints

### 📍 Create an image processing task

- **Method:** `POST /tasks`

- **Description:** Creates an image processing task.

- **Request Body:**

```json
{
  "imagePath": "input/imagen.jpeg"
}
```

- **Response:**

```json
{
  "taskId": "65d4a54b89c5e342b2c2c5f6",
  "status": "pending",
  "price": 25.50
}
```

### 📍 Query a task

- **Method:** `GET /tasks/:taskId`

- **Description:** Returns the task status and results.

- **Response:**

```json
{
  "taskId": "65d4a54b89c5e342b2c2c5f6",
  "status": "completed",
  "price": 25.50,
  "images": [
    { "resolution": "1024", "path": "/output/image1/1024/abc123.jpg" },
    { "resolution": "800", "path": "/output/image1/800/xyz456.jpg" }
  ]
}
```

---

## 🛠️ Testing

Run unit tests with:

```sh
npm run test
```

For integration test:

```sh
npm run test:e2e
```
