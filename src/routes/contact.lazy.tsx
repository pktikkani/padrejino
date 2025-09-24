import {createLazyFileRoute} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";
import * as React from "react";

export const Route = createLazyFileRoute("/contact")({
    component: ContactRoute,
});

function ContactRoute() {
    const mutation = useMutation({
        mutationFn: function (e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            return postContact(
                formData.get("name") as string,
                formData.get("email") as string,
                formData.get("message") as string,
            );
        },

    });
    // const navigate = useNavigate();

    return (
        <div className="contact">
            <h2>Contact</h2>
            {mutation.isSuccess ? (
                <>
                    <h3>Submitted!</h3>
                    {/*{setTimeout(() => navigate({ to: "/" }), 1500) && null}*/}
                </>
            ) : (
                <form onSubmit={mutation.mutate}>
                    <input name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <textarea placeholder="Message" name="message"></textarea>
                    <button>Submit</button>
                </form>
            )}
        </div>
    );
}
