import API from "@/services/api";

//login
export function Login(phone: string, password: string) {
  return API.get({
    url: "/login/cellphone",
    data: {
      phone,
      password
    }
  });
}
