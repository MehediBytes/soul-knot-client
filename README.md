# Soul-Knot

Welcome to the Matrimony Platform Soul-Knot! This online platform connects users with potential life partners through an intuitive, user-friendly interface. Built using the MERN stack (MongoDB, Express, React, and Node.js), this platform offers numerous features for creating, managing, and interacting with biodata.

## Live Site
- [Live Site URL](https://soul-knot.web.app)

## Live Server
- [Server Site URL](https://soul-knot-server.vercel.app)

---

## Features

### Responsive Design
- Fully responsive layout for mobile, tablet, and desktop views.

### Authentication
- Email/password login and registration with Google Sign-in.
- Protected routes ensure only authenticated users can access sensitive pages.
- Sweet alerts/toasts for login, signup, and CRUD operations.

### Homepage
- Beautiful banner showcasing key features.
- Premium member cards with filters (e.g., age, division).
- Dropdown menu for sorting cards by ascending/descending age.
- "How it Works" section explaining the website functionality.
- Success counter section displaying key statistics (e.g., total biodata, gender breakdown, completed marriages).
- Success story section with reviews and star ratings sorted by marriage date.

### Biodatas Page
- Filter options (age, gender, division) on the left.
- "View Profile" redirects to the biodata details page (private route).

### Biodata Details Page
- Full details of a selected biodata.
- Only premium members can view contact information.
- Options to "Add to Favourites" or "Request Contact Information" (checkout page).
- Similar biodata recommendations based on gender.

### Checkout Page
- Users can request biodata contact information for $5 via Stripe.
- Requests are sent to the admin for approval.
- Pending requests are displayed on the "My Contact Request" page in the dashboard.

### Dashboard
#### Normal User:
- **Edit Biodata**: Create or edit biodata with dynamic ID generation.
- **View Biodata**: View biodata details and request premium status.
- **My Contact Requests**: View contact requests and their statuses.
- **My Favourites Biodata**: Manage favorite biodata entries.

#### Admin:
- **Admin Dashboard**: Display total biodata, male/female biodata counts, premium biodata count, and revenue.
- **Manage Users**: Approve, block, or delete user accounts.
- **Approve Premium**: Approve user requests for premium status.
- **Approve Contact Requests**: Manage and approve contact information requests.
- **Admin Credentials**: Email- hasan@khan.com, Pass- 1234Mm

### Notifications
- Sweet alerts/toasts for all user actions and CRUD operations.
- Real-time updates for approvals and changes.

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS (custom styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Payment:** Stripe
- **Data Fetching:** Tanstack Query
- **Alerts/Notifications:** Sweet Alert

---

### 🖼️ Project Screenshot  

![Soul-Knot Screenshot 2](https://i.ibb.co.com/YTt5r6bz/soul-knot-2.png)

---

## Environment Variables
Ensure the following environment variables are set:

### Firebase Configuration
```env
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

### MongoDB Configuration
```env
MONGO_URI=
JWT_SECRET=
```

---

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
3. Add environment variables as shown above.
4. Start the development servers:
   ```bash
   npm run dev
   ```
5. Access the app.

---

## Additional Notes
- Ensure MongoDB and Stripe accounts are set up correctly.

---

### Key Highlights
1. Responsive design for all devices.
2. Advanced filtering and sorting options.
3. Secure authentication and authorization.
4. Admin panel for managing users and biodata.
5. Dynamic ID generation for biodata entries.
6. Stripe integration for secure payments.
7. Real-time success story updates and user notifications.
