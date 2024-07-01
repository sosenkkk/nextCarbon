# Carbon

[Click here to visit the website](https://next-carbon.vercel.app/)

Carbon is a modern e-commerce website designed to provide a seamless shopping experience. The frontend is built with Next.js and styled with Tailwind CSS, while the backend is powered by Node.js. For dynamic animations, Carbon utilizes Framer Motion.

## Features

- **Dynamic UI**: Built with Next.js for server-side rendering and fast client-side navigation.
- **Responsive Design**: Tailwind CSS ensures a responsive and mobile-first design.
- **Smooth Animations**: Framer Motion provides smooth and interactive animations.
- **Dark and Light Mode**: Offers both dark and light modes for a modern user experience.
- **Secure and Scalable**: Built with security best practices and scalability in mind.
- **Admin Panel**: An admin panel is available (not visible to all users) to track the status of orders and manage the store.

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **Node.js**: JavaScript runtime environment for server-side development.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Framer Motion**: Library for creating animations and gestures.

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js installed on your local machine

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/carbon.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd carbon
    ```

3. **Install dependencies for the backend:**

    ```bash
    cd server
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add your necessary environment variables.

5. **Start the backend server:**

    ```bash
    npm run dev
    ```

6. **Navigate to the client directory and install dependencies:**

    ```bash
    cd ../client
    npm install
    ```

7. **Start the Next.js development server:**

    ```bash
    npm run dev
    ```

Your application should now be running on `http://localhost:3000` for the frontend.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
