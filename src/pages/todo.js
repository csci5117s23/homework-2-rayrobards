import { useRouter } from "next/router";

export default function TodoItem() {
    const router = useRouter();
    const {id} = router.query;
    return (
        <span>{id}</span>
    )
}

