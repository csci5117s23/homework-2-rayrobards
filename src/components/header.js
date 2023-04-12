import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageHeader(pageTitle) 
{
    const {signOut} = useClerk();
    const router = useRouter();
    
    function userSignOut()
    {
        //on signout reload the page, goes back to home
        signOut(router.reload(window.location.pathname));
    }

    return (
        <div className="pure-g pageHeader">
            <div className="pure-u-1-3"></div>
            <div className="pure-u-1-3 titleContainer"><span>{pageTitle.pageTitle}</span></div>
            <div className="pure-u-1-3 signOutButtonContainer">
                <button className="signOutButton" title="sign out" onClick={userSignOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="signOutIcon"></FontAwesomeIcon>
                </button>
            </div>
        </div>
    )
}