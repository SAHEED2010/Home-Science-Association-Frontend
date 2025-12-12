import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // --- IMPORTANT ---
        // In a real application, you would look up the user in your database
        // and verify the password hash.
        // For this example, we'll accept a mock user.
        if (email === "admin@hsa.edu.ng" && password === "password") {
            // 1. User is valid, create a JWT token.
            const token = sign({ email, role: "admin" }, JWT_SECRET, {
                expiresIn: "1h",
            });

            // 2. Serialize the token into a cookie.
            const serializedCookie = serialize("auth-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60, // 1 hour
                path: "/",
            });

            // 3. Return a success response with the cookie in the headers.
            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { "Set-Cookie": serializedCookie },
            });
        }

        // If authentication fails
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred." }, { status: 500 });
    }
}