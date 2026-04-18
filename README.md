# 🏠 **Wanderlust – Smart Travel Stay Platform**

**Wanderlust** is a full-stack web application built with **Node.js, Express.js, MongoDB, and EJS** that allows users to **list, explore, and book accommodations** effortlessly.

Inspired by modern travel platforms like Airbnb and Trip.com, Wanderlust brings a clean, intuitive, and secure travel experience where users can discover unique stays, manage bookings, and create personalized wishlists — all in one place.

---

## 📸 **Project Glimpse**

### 🏡 Homepage & Listings

<img width="1882" height="897" alt="Screenshot 2025-10-27 195039" src="https://github.com/user-attachments/assets/a22b344b-bffa-453a-bf02-b59788d6b357" />  
*Browse through curated accommodations with advanced search and filter options.*

### 🔍 Search & Filter

<img width="1236" height="707" alt="Screenshot 2025-10-27 195211" src="https://github.com/user-attachments/assets/56e7ab6c-6fb4-421e-b798-15e8d993cf81" />  
**Find your ideal stay using filters for category, price, and location.**

### 🏠 Property Details

<img width="921" height="791" alt="Screenshot 2025-10-27 195309" src="https://github.com/user-attachments/assets/ffec87d2-520d-45b7-908a-94871bb76a9e" />  
*Explore detailed property information, amenities, and availability.*

### ❤️ Wishlist

<img width="984" height="498" alt="Screenshot 2025-10-27 195402" src="https://github.com/user-attachments/assets/50aa9500-ce9d-43aa-ba76-8d7f3c0d7454" />  
*Save your favorite properties for future trips.*

### 📅 Booking Management

<img width="691" height="484" alt="Screenshot 2025-10-27 195521" src="https://github.com/user-attachments/assets/6a7871da-9f11-47e0-bd37-042987b8eec7" />  
*Track and manage your bookings seamlessly.*

### 👤 User Profile

<img width="1083" height="361" alt="Screenshot 2025-10-27 195355" src="https://github.com/user-attachments/assets/ac825810-31df-461e-a508-44493d8122e8" />  
*Manage your bookings, profile information, and saved listings.*

---

## ✨ **Key Features**

### 🔐 User Authentication

* Secure sign-up and login with **Passport.js**
* Password encryption via **bcrypt.js**
* Editable user profiles and session tracking

### 🏡 Stay Listings

* Create, read, update, and delete listings
* Upload multiple property images using **Multer** and **Cloudinary**
* Add detailed property info: price, location, amenities, capacity, etc.
* Categorized stays: House, Apartment, Villa, Cottage, and more

### 🔍 Smart Search & Filters

* Search by title, location, or description
* Filter stays by category, price range, and guest capacity
* Real-time dynamic filtering and search results

### 📅 Booking System

* Book properties with calendar-based date selection
* Automatic price calculation with service charges
* Booking status tracking (pending, confirmed, canceled)
* Booking history for every user

### ⭐ Reviews & Ratings

* Submit and view reviews for each listing
* Average rating display per property
* Review management for logged-in users

### ❤️ Wishlist

* Save preferred stays to a personal wishlist
* Easily manage saved properties for future bookings

### 🔧 Admin Dashboard

* **Comprehensive Overview**: Listings, users, reviews, and bookings at a glance
* **Listing Management**: Edit, delete, toggle availability
* **User Management**: Promote/demote admin roles
* **Advanced Filters** for admin search
* **Real-time Stats** for platform activity monitoring
* **Role-Based Access Control** for admin-only operations

<img width="1739" height="791" alt="image" src="https://github.com/user-attachments/assets/f754b571-5560-4da3-85ab-ec996eb5461a" />


### 🛡️ Security Features

* Input validation via **Joi**
* **Helmet** for XSS and header protection
* **CSRF protection** integrated
* Sanitized HTML to prevent script injection

---

## 🚀 **Getting Started**

### Prerequisites

* Node.js (v14 or higher)
* MongoDB (local or Atlas)
* Git installed

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd house-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure MongoDB**

   * Default connection: `mongodb://127.0.0.1:27017/wanderlust`
   * Or update the URI in `app.js`

4. **Initialize sample data**

   ```bash
   node init/index.js
   ```


5. **Start the application**

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

6. **Access the web app**

   * Visit: `http://localhost:3000`

---

## 👤 **Demo Account**

* **Username:** `demouser`
* **Password:** `password123`

---

## 📁 **Project Structure**

```
house-project/
├── controllers/
│   ├── admin.js
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── admin.js
│   ├── booking.js
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── views/
│   ├── admin/
│   ├── bookings/
│   ├── listings/
│   ├── users/
│   ├── layouts/
│   └── includes/
├── init/
│   ├── data.js
│   ├── users.js
│   └── index.js
├── public/
├── middleware.js
├── validation.js
└── app.js
```

---

## 🛠️ **Technologies Used**

### Backend

* Node.js, Express.js, MongoDB, Mongoose
* Passport.js for authentication

### Frontend

* EJS, Bootstrap 5, Vanilla JavaScript, Font Awesome

### Security & Validation

* Helmet, Joi, bcryptjs, express-session

### Utilities

* Multer, Cloudinary, connect-flash

---

## 🎯 **Usage Guide**

### For Users

1. Browse available stays on the homepage
2. Use search and filters to refine options
3. Create an account or log in
4. Book your favorite property securely
5. Manage profile, bookings, and wishlist

### For Admins

* Access advanced dashboard for listings and users
* Manage platform data efficiently
* View real-time stats and system activity

---

## 🔧 **Configuration**

### Environment Variables

Create a `.env` file:

```env
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🚀 **Deployment**

### Local Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Deployed on **Render**
🔗 **Live Demo:** [https://house-project-ew8l.onrender.com/](https://house-project-ew8l.onrender.com/)

---

## 📝 **API Endpoints**

### Listings

* `GET /listings` – Fetch all stays
* `GET /listings/new` – Show create form
* `POST /listings` – Add new listing
* `GET /listings/:id` – View specific listing
* `PUT /listings/:id` – Edit listing
* `DELETE /listings/:id` – Remove listing

### Users

* `POST /signup` / `POST /login` / `GET /logout`
* `GET /profile` – User dashboard
* `GET /wishlist` – Saved listings

### Bookings

* `POST /bookings` – Create booking
* `GET /bookings` – View user bookings

### Reviews

* `POST /listings/:id/reviews` – Add review
* `DELETE /listings/:id/reviews/:reviewId` – Delete review

### Admin

* Admin-only routes for managing listings, users, and platform data

---

## 🐛 **Troubleshooting**

1. **MongoDB not connecting?**

   * Start MongoDB service and verify `MONGO_URL`.

2. **No listings showing?**

   * Run `node init/index.js` to seed data.

3. **Images not loading?**

   * Check Cloudinary credentials in `.env`.

4. **Search not responding?**

   * Restart the server or verify console errors.

---

## 💡 **Future Enhancements**

* AI-driven property recommendations based on user preferences
* Dynamic pricing insights for hosts
* Smart itinerary generator for travelers
* Integrated maps and nearby attractions

---


