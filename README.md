---


# 🌐 Resource Clade

A full-stack platform that curates and shares **free learning resources** across Web Development, AI, and Data Science.  
Built with the **MERN Stack**, **Google OAuth**, and **Framer Motion** for sleek animations.  
Tested successfully with **300+ real users simultaneously**.

---

## 🚀 Live Demo
🔗 [Try Resource Clade](https://resource-clade.vercel.app)  
💻 [View Source Code](https://github.com/mahesh-09-12/resource-clade)

---

## ✨ Features
- 📚 **Curated Resources:** Filter and explore categorized resources in Web Dev, AI, and Data Science.  
- 🔐 **Google Authentication:** Secure login using OAuth 2.0 for smooth access.  
- ⚙️ **Full-Stack CRUD APIs:** Built with Node.js, Express.js, and MongoDB (Mongoose).  
- 🎞️ **Modern Animations:** Powered by Framer Motion for smooth transitions.  
- 📈 **Performance Tested:** Handled 300+ real concurrent users, maintaining stable performance.  

---

## 🛠️ Tech Stack
| Layer | Tools / Libraries |
|:------|:------------------|
| Frontend | React.js, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | Google OAuth 2.0 |
| Deployment | Vercel / Render |

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository

git clone https://github.com/mahesh-09-12/resource-clade

cd resource-clade

2️⃣ Install dependencies

cd client && npm install

cd ../server && npm install

3️⃣ Configure Environment Variables

Create a .env file in both client and server directories.

Client (client/.env):

VITE_GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

VITE_API_URL=http://localhost:5000

Server (server/.env):

env

PORT=5000

MONGO_URI=your_mongodb_connection_uri

JWT_SECRET=your_jwt_secret

4️⃣ Run the project

Start backend:

cd server

npm start

Start frontend:

cd ../client

npm run dev

Visit http://localhost:5173 in your browser.

🧩 Folder Structure

client/

 └── src/
 
     ├── components/
     
     ├── pages/
     
     ├── assets/
     
     └── App.jsx
     
     
server/

 ├── models/
 
 ├── routes/
 
 ├── controllers/
 
 └── index.js
 
💡 Future Enhancements

Add a bookmark feature for favorite resources.

Enable upvoting/downvoting of resources.

Introduce AI-based recommendation of new learning paths.

🤝 Contributing

Contributions and suggestions are welcome! Open an issue or submit a pull request.

📄 License

MIT License © 2025 Mahesh Gali
