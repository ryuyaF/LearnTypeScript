import { useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'

interface CatCategory {
    id: number
    name: string
}

interface SearchCatImage {
    breeds: string[];
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
    console.log('fetchCatImage')
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const result: SearchCatImage[] = await res.json()

    return result[0]
}

interface IndexPageProps {
    initialCatImageUrl: string
}
const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
    const [catImage, setCatImage] = useState<string>(initialCatImageUrl)

    const handleClick = async () => {
        const image = await fetchCatImage()
        setCatImage(image.url)
    }

    return (
        <div>
            <button onClick={handleClick}>きょうのにゃんこ🐈‍⬛</button>
            <div style={{ marginTop: 8}}>
                <img src={catImage} width={500} height='auto' />
            </div>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    console.log('getServerSideProps')
    const catImage = await fetchCatImage()

    return {
        props: {
            initialCatImageUrl: catImage.url
        },
    }
}

export default IndexPage