"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FileUploadForm from "./FileUploadForm";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { FileText, FileUp, UserIcon } from "lucide-react";

interface DashboardContentProps {
    userId: string,
    userName: string,
}

export default function DashboardContent({
    userId
}: DashboardContentProps) {

    const searchParams = useSearchParams();
    const tabParams = searchParams.get("tab");

    const { isSignedIn, isLoaded, user } = useUser();

    //for tabs between files
    const [activeTab, setActiveTab] = useState<string>("files");

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    if (!isSignedIn || !isLoaded) {
        return "please sign-in to see content !";
    }

    //set active tab based on URL params
    // useEffect(() => {
    //     if (activeTab === "profile") {
    //         setActiveTab("profile");
    //     } else {
    //         setActiveTab("files");
    //     }
    // }, [tabParams]);

    return (
        <>
            <div className="mt-10 ml-8 mb-8">
                <h1 className="text-4xl font-bold">Hi, <span className="text-[#9BFF00]">{user?.firstName}</span> !</h1>
                <p className="text-lg">your images are waiting for you...</p>
            </div>
            <Tabs
                aria-label="dashboard_tabs"
                color="primary"
                variant="underlined"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                classNames={{
                    tabList: "gap-6",
                    tab: "py-3",
                    cursor: "bg-primary"
                }}
            >
                <Tab key="files"
                    title={
                        <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8" />
                            <p className="text-lg font-medium">My Files</p>
                        </div>
                    }
                >
                    <Card>
                        <CardHeader className="flex gap-3">
                            <FileUp className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Upload</h2>
                        </CardHeader>
                        <CardBody>
                            <FileUploadForm/>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="profile"
                    title={
                        <div className="flex items-center gap-3">
                            <UserIcon className="h-8 w-8" />
                            <p className="text-lg font-medium">Profile</p>
                        </div>
                    }
                >
                    <div>
                        user profile
                    </div>
                </Tab>
            </Tabs>
        </>
    )
}