import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import * as React from "react";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export const Route = createLazyFileRoute("/contact")({
    component: ContactRoute,
});

function ContactRoute() {
    const mutation = useMutation({
        mutationFn: async (formData: ContactFormData) => {
            return postContact(formData.name, formData.email, formData.message);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutation.mutate({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        });
    };

    return (
        <div className="contact">
            <h2>Contact</h2>
            {mutation.isSuccess ? (
                <>
                    <h3>Submitted!</h3>
                    {/*{setTimeout(() => navigate({ to: "/" }), 1500) && null}*/}
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <textarea placeholder="Message" name="message"></textarea>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}