import { UserButton } from "@clerk/clerk-react";

export default function PageHeader(pageTitle) 
{
    return (
        <div className="pageHeader">
            <span>{pageTitle.pageTitle}</span>
            <UserButton className="userIcon" afterSignOutUrl="/"/>
        </div>
    )
}