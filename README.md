# 🏠 Wanderlust - Airbnb Clone

A full-stack web application built with Node.js, Express, MongoDB, and EJS that allows users to list, search, and book accommodations similar to Airbnb.
## 📸 Project Glimpse

### 🏡 Homepage & Listings
![Homepage]<img width="1882" height="897" alt="Screenshot 2025-10-27 195039" src="https://github.com/user-attachments/assets/a22b344b-bffa-453a-bf02-b59788d6b357" />
*Browse through beautiful listings with advanced search and filtering options*

### 🔍 Search & Filter
![Search]<img width="1236" height="707" alt="Screenshot 2025-10-27 195211" src="https://github.com/user-attachments/assets/56e7ab6c-6fb4-421e-b798-15e8d993cf81" />

*Find your perfect stay with category, price, and location filters*

### 🏠 Property Details
![Property Details]<img width="921" height="791" alt="Screenshot 2025-10-27 195309" src="https://github.com/user-attachments/assets/ffec87d2-520d-45b7-908a-94871bb76a9e" />

*Detailed property information with booking functionality and wishlist*

### ❤️ Wishlist
![Wishlist]<img width="984" height="498" alt="Screenshot 2025-10-27 195402" src="https://github.com/user-attachments/assets/50aa9500-ce9d-43aa-ba76-8d7f3c0d7454" />

*Save your favorite properties for later*

### 📅 Booking Management
![Bookings]<img width="691" height="484" alt="Screenshot 2025-10-27 195521" src="https://github.com/user-attachments/assets/6a7871da-9f11-47e0-bd37-042987b8eec7" />

*Manage your bookings with status tracking*

### 👤 User Profile
![Profile]<img width="1083" height="361" alt="Screenshot 2025-10-27 195355" src="https://github.com/user-attachments/assets/ac825810-31df-461e-a508-44493d8122e8" />

*Complete user profile management*

---

## ✨ Features

### 🔐 User Authentication
- User registration and login
- Secure password hashing with Passport.js
- Session management
- User profiles with edit functionality

### 🏡 Listings Management
- Create, read, update, and delete listings
- Image upload support (Cloudinary ready)
- Multiple property categories (House, Apartment, Villa, Cottage, etc.)
- Detailed property information (bedrooms, bathrooms, amenities)
- Location and pricing details

### 🔍 Search & Filter
- Search by title, location, or description
- Filter by category, price range, and guest capacity
- Real-time search results
- Advanced filtering options

### 📅 Booking System
- Book accommodations with date selection
- Automatic price calculation with service fees
- Booking status management (pending, confirmed, cancelled)
- Booking history for users

### ⭐ Reviews & Ratings
- Leave reviews and ratings for properties
- View all reviews for a listing
- Average rating calculation

### ❤️ Wishlist
- Save favorite listings to wishlist
- Easy wishlist management
- Quick access to saved properties

### 🛡️ Security Features
- Input validation with Joi
- XSS protection with Helmet
- CSRF protection
- Sanitized HTML content

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

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

3. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://127.0.0.1:27017/wanderlust`
   - Or update the connection string in `app.js`

4. **Initialize sample data**
   ```bash
   node init/index.js
   ```
   This will create:
   - Sample listings (29 properties)
   - Demo user account

5. **Start the application**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:3000`

## 👤 Demo Account

Use these credentials to test the application:
- **Username:** `demouser`
- **Password:** `password123`

## 📁 Project Structure

```
house-project/
├── controllers/          # Route controllers
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/              # MongoDB schemas
│   ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── booking.js
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── views/               # EJS templates
│   ├── bookings/
│   ├── listings/
│   ├── users/
│   ├── layouts/
│   └── includes/
├── init/                # Database initialization
│   ├── data.js          # Sample listings
│   ├── users.js         # Sample users
│   └── index.js         # Init script
├── public/              # Static files (CSS, JS, images)
├── middleware.js        # Custom middleware
├── validation.js        # Input validation schemas
└── app.js              # Main application file
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication
- **EJS** - Template engine

### Frontend
- **Bootstrap 5** - CSS framework
- **Font Awesome** - Icons
- **Vanilla JavaScript** - Client-side functionality

### Security & Validation
- **Helmet** - Security headers
- **Joi** - Input validation
- **bcryptjs** - Password hashing
- **express-session** - Session management

### Additional Features
- **Multer** - File upload handling
- **Cloudinary** - Image storage (configured)
- **connect-flash** - Flash messages
- **method-override** - HTTP method override

## 🎯 Usage Guide

### For Users
1. **Browse Listings:** Visit the homepage to see all available properties
2. **Search:** Use the search bar to find specific locations or property types
3. **Filter:** Apply filters for category, price range, and guest capacity
4. **Register/Login:** Create an account or login to access booking features
5. **Book Property:** Select dates and number of guests to make a booking
6. **Manage Profile:** Update your profile information and view booking history
7. **Wishlist:** Save your favorite properties for later

### For Property Owners
1. **Add Listing:** Click "Add new listing" to create a property listing
2. **Manage Listings:** Edit or delete your existing listings
3. **View Bookings:** Check booking requests for your properties
4. **Respond to Reviews:** Engage with guest reviews

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Database Configuration
- Default database: `wanderlust`
- To change database name, update `MONGO_URL` in `app.js`

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start    # Standard Node.js start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Endpoints

### Listings
- `GET /listings` - Get all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - Show specific listing
- `GET /listings/:id/edit` - Show edit form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register user
- `GET /login` - Show login form
- `POST /login` - Login user
- `GET /logout` - Logout user
- `GET /profile` - Show user profile
- `GET /wishlist` - Show user wishlist

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - Show user bookings
- `GET /bookings/:id` - Show specific booking

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `app.js`

2. **No Listings Showing**
   - Run the initialization script: `node init/index.js`
   - Check database connection

3. **Search Not Working**
   - Restart the server
   - Check browser console for errors

4. **Images Not Loading**
   - Check image URLs in database
   - Verify Cloudinary configuration (if using)

