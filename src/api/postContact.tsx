interface ContactSuccessResponse {
    success: string;
}

interface ContactErrorResponse {
    error: string;
}

type ContactResponse = ContactSuccessResponse | ContactErrorResponse;



export default async function postContact(name: string, email: string, message: string): Promise<ContactResponse> {
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, message}),
    });

    if (!response.ok) {
        throw new Error("Network Response was not ok. Send help.");
    }

    return response.json();
}