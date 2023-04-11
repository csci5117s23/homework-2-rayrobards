import Link from 'next/link'

export default function Page404() {
    return (
        <div className='page404'>
            <div className='page404Content'>
                <p>404: This page couldnt be found</p>
                <Link href="/todos">Back to todos</Link>
            </div>
        </div>
    )
}