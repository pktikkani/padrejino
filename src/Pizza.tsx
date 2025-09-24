interface PizzaProps {
    id?: string;
    name: string;
    category?: string;
    description: string;
    image?: string;
    sizes?: Record<string, number>;
}


const Pizza = (props: PizzaProps) => {
    return (
        <div className="pizza">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img src={props.image ? props.image : "https://picsum/photos/200"} alt={props.name} />
        </div>
    );
};

export default Pizza;