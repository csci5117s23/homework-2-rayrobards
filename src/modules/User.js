import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/clerk-react";

export function signOutUser() {
    console.log("signout")
    const signOut = useClerk();
    // // const { signOut } = useClerk();
    // // const router = useRouter();
    // const {userId} = useAuth();
    // return (
    //     <div>
    //         <p>{userId}</p>
    //     </div>
    // )
}