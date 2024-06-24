import { Inter } from "next/font/google";
// globals is our root styling css file
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// this metadata object is used to provide information about the layout
// also opengraph and twitter metadata is generated from this object
// so like the image that gets embedded when you share a link on twitter or facebook in the caht
export const metadata = {
  title: "Weather app",
  description: "Weather app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
