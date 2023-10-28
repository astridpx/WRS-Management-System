import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import AuthProvider from "@/lib/next-auth/AuthProvider";
// import { Toaster } from "@/components/ui/toaster"; // ? SHADCN TOASTER
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/lib/react-query/ReactQueryProvider";
import ThemeProviderWrapper from "@/lib/next-theme/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Morning Breeze",
  description:
    "Morning Breeze Water Refilling Station in Sta Rosa Laguna | Sta Rosa Laguna.",
  icons: {
    icon: "/src/assets/logo2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* // ? temporary remove auth */}
      <AuthProvider>
        <ThemeProviderWrapper>
          <body className={`${poppins.className} bg-[#ECF0FA]`}>
            <ReactQueryProvider>
              {children}
              {/* <Toaster /> */}
              <ToastContainer />
              <Toaster position="bottom-right" reverseOrder={false} />
            </ReactQueryProvider>
          </body>
        </ThemeProviderWrapper>
      </AuthProvider>
    </html>
  );
}
