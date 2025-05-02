import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, isNotNull } from "drizzle-orm";
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

//imagekit credentials
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""
});

export async function POST(request: NextRequest) {

    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                error: "unauthorized",
            }, {
                status: 401
            });
        }

        //parse form data
        const formData = await request.formData();
        const file = formData.get("files") as File;
        const formUserId = formData.get("userId") as string;
        const parentId = formData.get("parentId") as string || null;

        if (formUserId !== userId) {
            return NextResponse.json({
                error: "unauthorized",
            }, {
                status: 401
            });
        }

        if (!file) {
            return NextResponse.json({
                error: "No file provided",
            }, {
                status: 401
            });
        }

        //check if parentId exists
        if (parentId) {
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, userId),
                        eq(files.isFolder, true)
                    )
                )
        }

        if (!parentId) {
            return NextResponse.json(
                { error: "Parent folder not found" },
                { status: 401 }
            );
        }

        //check file type
        if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
            return NextResponse.json({
                error: "file does not support image/pdf type"
            }, { status: 401 });
        }

        //create buffer
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const folderPath = parentId ? `/collide/${userId}/folder/${parentId}` : `/collide/${userId}`;

        const originalFilename = file.name

        const fileExtension = originalFilename.split(".").pop() || ""
        //check for empty extension
        const uniqueFilename = `${uuid()}.${fileExtension}`

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: uniqueFilename,
            folder: folderPath,
            useUniqueFileName: false
        });

        const fileData = {
            name: originalFilename,
            path: uploadResponse.filePath,
            size: file.size,
            type: file.type,
            fileUrl: uploadResponse.url,
            thumbnailUrl: uploadResponse.thumbnailUrl || null,
            userId: userId,
            parentId: parentId,
            isFolder: false,
            isStarred: false,
            isTrash: false
        }

        const [newFile] = await db.insert(files).values(fileData).returning();

        return NextResponse.json(newFile);

    } catch (error) {
        return NextResponse.json({
            error: "failed to upload file"
        })
    }
}