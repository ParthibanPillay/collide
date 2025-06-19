"use client"

import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { ArrowRight, FolderPlus, FolderUp } from "lucide-react";
import { useState } from "react"
import axios from "axios";

interface FileUploadFormProps {
    userId: string;
    onUploadSuccess?: () => void;
    currentFolder?: string | null;
}

export default function FileUploadForm({
    userId,
    onUploadSuccess,
    currentFolder
}: FileUploadFormProps) {

    //folder creation 
    const [folderModalOpen, setFolderModalOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [creatingFolder, setCreatingFolder] = useState(false);

    const handleCreateFolder = async () => {
        if (!folderName.trim()) {
            addToast({
                title: "invalid folder name",
                description: "enter a valid folder name",
                color: "danger"
            })
            return;
        }

        setCreatingFolder(true);

        try {
            await axios.post("api/folders/create", {
                name: folderName.trim(),
                userId: userId,
                parentId: currentFolder
            });

            addToast({
                title: "Folder created",
                description: `Folder ${folderName} created successfully.`,
                color: "success"
            });

            //reset
            setFolderName("");
            setFolderModalOpen(false);

            //call onUploadSuccess
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error("error creating folder", error);
            addToast({
                title: "Folder creation failed",
                description: "couldn't create the folder. Please try again.",
                color: "danger"
            });
        } finally {
            setCreatingFolder(false);
        }
    }

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

            {/* create folder modal */}
            <Modal
                isOpen={folderModalOpen}
                backdrop="blur"
                classNames={{
                    base: "border border-default-200 bg-default-5",
                    header: "border-b border-default-200",
                    footer: "border-t border-default-200"
                }}
            >
                <ModalContent>
                    <ModalHeader>
                        <FolderPlus className="h-5 w-5 text-[#9BFF00]" />
                        <span>New Folder</span>
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <p>Enter a name for your folder :</p>
                            <Input
                                type="text"
                                label="Folder Name"
                                placeholder="my images"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onPress={handleCreateFolder}
                            isLoading={creatingFolder}
                            isDisabled={!folderName.trim()}
                            endContent={!creatingFolder && <ArrowRight className="h-5 w-5" />}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="flat"
                            color="default"
                            onPress={() => setFolderModalOpen(false)}
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}