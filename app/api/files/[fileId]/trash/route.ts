import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, props: { params: Promise<{ fileId: string }> }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }

        const { fileId } = await props.params;

        if (!fileId) {
            return NextResponse.json({
                error: "fileId not found"
            }, {
                status: 401
            });
        }

        const [file] = await db
            .select()
            .from(files)
            .where(
                and(
                    eq(files.id, fileId),
                    eq(files.userId, userId),
                )
            )

        if (!file) {
            return NextResponse.json({
                error: "File not found"
            }, {
                status: 401
            });
        }

        //toggle trash option for files
        const trashedFiles = await db.update(files).set({ isTrash: !file.isTrash }).where(
            and(
                eq(files.id, fileId),
                eq(files.userId, userId)
            )
        ).returning();

        const trashedFile = trashedFiles[0];

        return NextResponse.json(trashedFile);

    } catch (error) {
        return NextResponse.json({
            error : "Failed to trash the file"
        })
    }
}