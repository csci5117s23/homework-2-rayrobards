import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/router";

const { signOut } = useClerk();

export async function signOutUser() {
    // const router = useRouter();
    signOut();
    router.push("/");
}