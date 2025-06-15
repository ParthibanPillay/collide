"use client"

import { Button } from "@heroui/button";
import { FolderPlus, FolderUp } from "lucide-react";
import { useState } from "react"

export default function FileUploadForm() {

    //folder creation 
    const [folderModalOpen, setFolderModalOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [creatingFolder, setCreatingFolder] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex gap-2 mb-2">
                {/* action buttons */}
                <Button
                    color="primary"
                    startContent={<FolderPlus className="h-5 w-5" />}
                    onPress={() => setFolderModalOpen(true)}
                    className="flex-1"
                >
                    New Folder
                </Button>
                <Button
                    color="primary"
                    startContent={<FolderUp className="h-5 w-5" />}
                    className="flex-1"
                >
                    Add Image
                </Button>
            </div>

            {/* file drop area*/}
            <div></div>
            
        </div>
    )
}