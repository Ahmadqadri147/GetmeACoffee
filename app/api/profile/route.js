import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";


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


        const existingUser = await User.findOne({ email: session.user.email });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: "User not found in database" },
                { status: 404 }
            );
        }




        if (body.username && body.username !== existingUser.username) {
            return NextResponse.json(
                { success: false, error: "Unauthorized: You can only update your own profile" },
                { status: 403 }
            );
        }




        const updateFields = {};


        if (body.name && body.name.trim()) {
            updateFields.name = body.name.trim();
        }


        if (body.bio && body.bio.trim()) {
            updateFields.bio = body.bio.trim();
        }


        if (body.profilepic && body.profilepic.trim()) {
            updateFields.profilepic = body.profilepic.trim();
        } else if (!existingUser.profilepic) {

            updateFields.profilepic = session.user.image || "";
        }


        if (body.coverpic && body.coverpic.trim()) {
            updateFields.coverpic = body.coverpic.trim();
        } else if (!existingUser.coverpic) {
            updateFields.coverpic = "/coverimg.jpg";
        }


        if (body.instagram && body.instagram.trim()) {
            updateFields.instagram = body.instagram.trim();
        }
        if (body.twitter && body.twitter.trim()) {
            updateFields.twitter = body.twitter.trim();
        }
        if (body.linkedin && body.linkedin.trim()) {
            updateFields.linkedin = body.linkedin.trim();
        }


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
