import "../../styles/Button.module.scss"

export function Button(props) {
    return (
        <div>
            <button className={props.className} type={props.type} onClick={props.onClick}>{props.name}</button>
        </div>
    )
}