import "./globals.css";
export const metadata ={
    title: 'Online Exam System',
    description: 'Built with Next.js and Tailwind.css'
};
export default function RootLayout ({children}){
    return(
        <html lang='en'>
            <head>
            {/* ✅ Font Awesome CDN */}
                <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                />
        </head>
            <body className='bg-gray-100 text-gray-900 font-sans'>
                {children}
            </body>
        </html>
    );
}