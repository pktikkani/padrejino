// mostly code from reactjs.org/docs/error-boundaries.html
import {Component, type ErrorInfo, type ReactNode} from "react";
import { Link } from "@tanstack/react-router";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Uh oh!</h2>
                    <p>
                        There was an error with this listing. <Link to="/">Click here</Link>{" "}
                        to back to the home page.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;