import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export default function Cards(props) {
	const dispatch = useDispatch()
	const tasks = useSelector((state) => state.tasks)
	const [toggle, setToggle] = useState(true)
	const [editTodo, setEditTodo] = useState('')
	const [completed, setCompleted] = useState(true)
	function deleteTask(id) {
		dispatch({ type: 'tasks/deleteTask', payload: id })
	}
	function goEditTodo(e) {
		if (e.key === 'Enter') {
			tasks.forEach((e) => {
				if (e.id === props.task.id) {
					e.todo = editTodo
				}
			})
			dispatch({
				type: 'tasks/setTasks',
				payload: tasks,
			})
			setToggle(true)
		}
	}
	function toComplete() {
		setCompleted(!completed)
		tasks.forEach((e) => {
			if (e.id === props.task.id) {
				e.completed = completed
			}
		})
		dispatch({ type: 'tasks/setTasks', payload: tasks })
	}
	return (
		<>
			<div className="flex bg-grey-light w-full h-auto p-2 mt-4 rounded-lg">
				<div className="flex w-1/6 text-right pr-2 vHolder">
					{props.task.completed ? (
						<i
							style={{ color: 'green' }}
							className="fa fa-check-square text-2xl"
							aria-hidden="true"
							onClick={() => toComplete()}
						></i>
					) : (
						<i
							style={{ color: 'lightBlue' }}
							className="fa fa-check-square text-2xl"
							aria-hidden="true"
							onClick={() => toComplete()}
						></i>
					)}
				</div>
				{toggle ? (
					<div className="w-5/6 font-sans font-light text-2xl text-center bg-grey-lightest pt-1 shadow-md rounded-lg">
						{props.task.completed ? (
							<p>
								<s>{props.task.todo}</s>
							</p>
						) : (
							<h3 onDoubleClick={() => setToggle(false)}>{props.task.todo}</h3>
						)}
					</div>
				) : (
					<input
						placeholder={props.task.todo}
						autoFocus
						onChange={(e) => setEditTodo(e.target.value)}
						onKeyUp={(e) => goEditTodo(e)}
						className="w-5/6 font-sans font-light text-2xl text-center bg-grey-lightest pt-1 shadow-md rounded-lg"
					/>
				)}

				<div className="flex w-1/6 text-right pr-2 xHolder">
					<i
						className="fa fa-times text-2xl"
						aria-hidden="true"
						onClick={() => deleteTask(props.task.id)}
					></i>
				</div>
			</div>
		</>
	)
}
