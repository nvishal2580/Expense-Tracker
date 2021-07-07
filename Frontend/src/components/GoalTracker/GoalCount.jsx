
const GoalCount = ({ title, count, filterGoals }) => {

    const handleClass = () => {
        let cls = "btn btn-";
        if (title === 'Total') {
            cls += "info";
        } else {
            cls += "success"
        }
        return cls;
    }

    return (
        <button onClick={filterGoals} name={title} type="button" class={handleClass()}>
            {title} <span class={"badge badge-light"}>{count}</span>
        </button>
    );
}

export default GoalCount;