type ContactResponse =
    | { success: true; message: string }
    | { success: false; error: string };

export default async function postContact(
    name: string,
    email: string,
    message: string
): Promise<ContactResponse> {
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
        return { success: false, error: data.error || "Unknown error" };
    }

    return { success: true, message: data.success };
}