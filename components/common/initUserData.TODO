import useAxiosAuth from "/lib/hooks/useAxiosAuth";

// ##### Method 1

async function getArtist(username: string) {
    const res = await fetch(`https://api.example.com/artist/${username}`)
    return res.json()
}

async function getArtistAlbums(username: string) {
    const res = await fetch(`https://api.example.com/artist/${username}/albums`)
    return res.json()
}


// ##### Method 2

export const preload = (userId: string) => {
    // void evaluates the given expression and returns undefined
    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
    void getServerAsynchInitData(userId)
}

const getServerAsynchInitData = async (userId: string) => {

    const axiosAuth = useAxiosAuth();
    const res = await axiosAuth.get("/api/v1/user/initData/");
    let initData = res.data;
    return initData;
};



export default async function InitUserData({ userId }: { userId: string }) {

    // 1: Initiate both requests in parallel
    const artistData = getArtist(userId)
    const albumsData = getArtistAlbums(userId)

    // 1.2: AWAIT PROMISE.ALL - Wait for the promises to resolve : 
    const [artist, albums] = await Promise.all([artistData, albumsData])

    // 2: PRELOAD function
    const result = await getServerAsynchInitData(userId)
    // ...
    
    // 3: REACT CACHE : fetch same User - response will be cached!!!
    // use the same data (e.g. current user) in multiple components in a tree, you do not have to fetch data globally, nor forward props between components. 
    // Instead, you can use fetch or React cache in the component that needs the data without worrying about the performance implications of making multiple requests for the same data.


    // 3.1 clear cache of fetch (on Error)
    'use server'

    import { revalidatePath } from 'next/cache'

    export async function createPost() {
        try {
            // ...
        } catch (error) {
            // ...
        }

        revalidatePath('/user')  or    revalidateTag('user')

    }
    
}

//4:


//'use server'
export async function serverMethod() {
    // ...
}

// ----------------------------
//'use client'
import { serverMethod } from '@/app/actions'

// ----------------------------
//'use client'
function ClientComponent({ serverMethod }) {
    return <form action={serverMethod}>{/* ... */}</form>
}

//TODO https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
/////////////////////////// update user on serverSide, not in client f12 :)))))) 
'use server'

export async function serverMethodUpdateUser(userId, formData) {


//-----------------

// 'use client'

// import { serverMethodUpdateUser } from './actions'

export function UserProfile({ userId }: { userId: string }) {
    const updateUserWithId = serverMethodUpdateUser.bind(null, userId)

    return (
        <form action={updateUserWithId}>
            <input type="text" name="name" />
            <button type="submit">Update User Name</button>
        </form>
    )
}


////////////// Server-side validation of email: ckient cannot manipulate

///////////// useEffect with asynch serverAction
    const [views, setViews] = useState(initialViews)

    useEffect(() => {
        const updateViews = async () => {
            const updatedViews = await incrementServerAction()
            setViews(updatedViews)
        }

        updateViews()
    }, [])
    
    
/////////////////create error in serverMethod
    'use server'

    export async function createServerTodo(prevState: any, formData: FormData) {
        try {
            // Mutate data
        } catch (e) {
            throw new Error('Failed to create task')
        }
    }
    
    
 //////////// redirect client in serverMethod
  z.b: optional  revalidateTag('posts') // Update cached posts

    redirect(`/post/${id}`) // Navigate to the new post page


/////////////// coockies

    'use server'

    import { cookies } from 'next/headers'

    export async function exampleAction() {
        // Get cookie
        const value = cookies().get('name')?.value

        // Set cookie
        cookies().set('name', 'Delba')

        // Delete cookie
        cookies().delete('name')
    }