export function saveToken(token: string) {
    localStorage.setItem("authToken", token);
}

export function getToken(): string | null {
    return localStorage.getItem("authToken");
  }