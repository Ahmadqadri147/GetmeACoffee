import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

// GET /api/profile?username=xyz — public fetch
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json(
                { success: false, error: "Username is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ username }).select("-__v");

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("GET /api/profile error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PUT /api/profile — authenticated update with conditional field logic
export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const body = await request.json();

        // Find the existing user
        const existingUser = await User.findOne({ email: session.user.email });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // --- Conditional Field Update (atomic upsert logic) ---
        // Only overwrite a field if the incoming value is non-empty.
        // This prevents null/undefined/empty strings from wiping existing data.
        const updateFields = {};

        // Name: use new value if provided, else keep existing
        if (body.name && body.name.trim()) {
            updateFields.name = body.name.trim();
        }

        // Bio
        if (body.bio && body.bio.trim()) {
            updateFields.bio = body.bio.trim();
        }

        // Profile picture: fallback to OAuth image if nothing provided AND no existing pic
        if (body.profilepic && body.profilepic.trim()) {
            updateFields.profilepic = body.profilepic.trim();
        } else if (!existingUser.profilepic) {
            // OAuth fallback — use the image from the session (GitHub/Google avatar)
            updateFields.profilepic = session.user.image || "";
        }

        // Cover picture: fallback to default if nothing provided AND no existing pic
        if (body.coverpic && body.coverpic.trim()) {
            updateFields.coverpic = body.coverpic.trim();
        } else if (!existingUser.coverpic) {
            updateFields.coverpic = "/coverimg.jpg";
        }

        // Social links
        if (body.instagram && body.instagram.trim()) {
            updateFields.instagram = body.instagram.trim();
        }
        if (body.twitter && body.twitter.trim()) {
            updateFields.twitter = body.twitter.trim();
        }
        if (body.linkedin && body.linkedin.trim()) {
            updateFields.linkedin = body.linkedin.trim();
        }

        // Perform the atomic update
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateFields },
            { new: true }
        ).select("-__v");

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("PUT /api/profile error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
