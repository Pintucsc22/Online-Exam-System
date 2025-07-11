// src/app/login/page.js

// Define the default export for the LoginPage component
export default function LoginPage() {
  return (
    // Wrapper div with full-screen height and centered content
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Main content box, white background, rounded corners, padding, shadow, and responsive width */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        {/* Heading for the login page */}
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        {/* Form container with spacing between fields */}
        <form className="space-y-4">
          
          {/* Email input field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              // Set input type to email
              type="email"
              // Apply tailwind classes for styling (full width, border, rounded, padding, focus states)
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              // Placeholder text for the email input
              placeholder="you@example.com"
            />
          </div>
          
          {/* Password input field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              // Set input type to password
              type="password"
              // Apply tailwind classes for styling
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              // Placeholder text for the password input
              placeholder="••••••••"
            />
          </div>
          
          {/* Submit button with styles for background color, text color, padding, rounded corners, hover effect, and transition */}
          <button
            // Type of button (submit the form)
            type="submit"
            // Tailwind classes for button styling
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Sign In {/* Button text */}
          </button>
        </form>
      </div>
    </div>
  );
}
