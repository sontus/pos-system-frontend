# POS System Frontend Setup

This README provides instructions on how to set up and run the POS System Frontend cloned from [github](https://github.com/sontus/pos-system-frontend.git).


### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
https://github.com/sontus/pos-system-frontend.git
```

Navigate to the project directory:

```bash
cd pos-system-frontend
```

### 2. Install  Dependencies

Make sure to install dependencies:

```bash
# npm
npm install
```


### 3. Setup API URL 

copy .env.example to .env and set backend url on .env

``` 
NUXT_PUBLIC_API_BASE_URL=http://pos-system-api.test/api/v1
```
```bash
cp .env.example .env
```
### 4. Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```
### 5. Production

Build the application for production:

```bash
# npm
npm run build
```
