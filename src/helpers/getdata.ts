import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getdata(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) return null;
        
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decoded.id; // Should return string or null/undefined only
    } catch (error) {
        console.error("Token verification error:", error);
        return null; // Return null instead of NextResponse
    }
}