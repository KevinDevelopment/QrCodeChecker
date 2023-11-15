import axios from "axios"

type TUrl = {
    url: string
}

export async function RequestForVerifyUrl({ url }: TUrl) {
    const response = await axios.post(`http://localhost/url`, { url });
    return response.data;
}