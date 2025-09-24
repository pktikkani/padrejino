import { type Pizza } from './types/types.ts';

interface PizzaProps extends Partial<Pizza> {
    name: string;
    description: string;
}


const PizzaComp = (props: PizzaProps) => {
    return (
        <div className="pizza">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img src={props.image ? props.image : "https://picsum/photos/200"} alt={props.name} />
        </div>
    );
};

export default PizzaComp;