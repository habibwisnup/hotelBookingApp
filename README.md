# HotelBooking

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

🔗 **Live Demo:** [https://courageous-paletas-1f7345.netlify.app](https://courageous-paletas-1f7345.netlify.app)

---

## 🧭 Application Workflow

### 1. Register as Admin
- Go to the **Register** page.
- Fill in your name, email, and password.
- Check the **"Admin" checkbox** to register as an admin user.
- Submit the registration form.

### 2. Admin Dashboard
- After registering as an admin, go to the **Admin Dashboard**.
- Add new **hotels** and **hotel rooms**, including availability dates and details.
- Once setup is complete, **log out**.

### 3. Register as User
- Go back to the **Register** page.
- Register with a different email and **do not** check the Admin checkbox.
- Submit the form to become a normal user.

### 4. Booking Flow
- On the home page or dashboard, **select the desired check-in date** that matches availability set by the admin.
- Click **Search Rooms** to see available hotels and rooms.
- Choose a room and proceed to **book** it.

### 5. Contact & Confirmation
- On the **Contact** page, you’ll be asked whether you want to use the **same name and email** as your registration.
- If yes, check the provided checkbox to auto-fill and validate.
- Click **"Process"** to complete the booking and receive a **booking receipt**.

---

## 🔧 Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🛠️ Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 🚀 Deployment

The application is deployed to Netlify:

🔗 [https://courageous-paletas-1f7345.netlify.app](https://courageous-paletas-1f7345.netlify.app)

For SPA routing support, ensure the `_redirects` file contains:

