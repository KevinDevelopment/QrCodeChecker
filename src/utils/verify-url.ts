import axios from "axios"

export const api = axios.create({
  baseURL: "https://qrcodeprod-production.up.railway.app/",
  headers: {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFwcCB2aXJ1cyIsImlhdCI6MTUxNjIzOTAyMn0.SNDVwuHmpDi7-sZd-7LMTYOBnJASJaYGsFvqwwHisYk"
  }
})