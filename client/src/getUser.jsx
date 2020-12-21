import axios from "axios";
import Cookie from "js-cookie";

async function getUser() {
    try {
        return new Promise((resolve, reject) => {
            const token = Cookie.get("jtk");
            if (!token) return null;
            else {
                const res = axios.get("/auth/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                res.then(result => {
                    resolve(result.data.user);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export default getUser;
