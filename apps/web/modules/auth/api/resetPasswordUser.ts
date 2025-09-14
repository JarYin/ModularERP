import { ResetForm } from "../validation";

export async function resetPasswordUser(token: string, values: ResetForm) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token,
            password: values.password,
        }),
    });

    if (!res.ok) {
        throw new Error("reset password failed!")
    }

    return res.json();

}