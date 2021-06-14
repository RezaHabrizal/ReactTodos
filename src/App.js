import './App.css'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from './components/Cards'
import swal from 'sweetalert'
import '@material-tailwind/react/tailwind.css'
import H1 from '@material-tailwind/react/Heading1'
import Input from '@material-tailwind/react/Input'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'

function App() {
	const tasks = useSelector((state) => state.tasks)
	const [taskNow, setTaskNow] = useState([])
	const [todo, setTodo] = useState('')
	const dispatch = useDispatch()
	const inputEl = useRef('')
	const [date, setDate] = useState('')

	useEffect(() => {
		const todayLocal = new Date().toLocaleDateString().split('/')
		if (+todayLocal[1] < 10) {
			todayLocal[1] = `0${todayLocal[1]}`
		}
		let getDay = []
		for (let i = todayLocal.length - 1; i >= 0; i--) {
			getDay.push(todayLocal[i])
		}
		setDate(getDay.join('-'))
	}, [])

	useEffect(() => {
		let task = tasks.filter((e) => e.date === date)
		setTaskNow(task)
	}, [date])
	useEffect(() => {
		let task = tasks.filter((e) => e.date === date)
		setTaskNow(task)
	}, [tasks])
	function addTask(e) {
		const today = new Date()
		const dateToday = today.getDate()
		if (e.key === 'Enter' || e.type === 'click') {
			if (date.split('-')[2] < +dateToday) {
				return swal('cannot create todos before today')
			}
			dispatch({
				type: 'tasks/addTask',
				payload: [{ todo, date, id: create_UUID(), completed: false }],
			})
			inputEl.current.value = ''
		}
	}
	function create_UUID() {
		var dt = new Date().getTime()
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			function (c) {
				var r = (dt + Math.random() * 16) % 16 | 0
				dt = Math.floor(dt / 16)
				return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
			}
		)
		return uuid
	}

	function removeCompleteTask(tasks, date) {
		let i = tasks.length
		while (i--) {
			if (
				tasks[i] &&
				tasks[i]['date'] === date &&
				tasks[i]['completed'] === true
			) {
				tasks.splice(i, 1)
			}
		}
		return tasks
	}

	function clearAllComplete() {
		const unDone = removeCompleteTask(tasks, date)
		dispatch({ type: 'tasks/setTasks', payload: unDone })
		setTask()
	}
	function setTask() {
		let task = tasks.filter((e) => e.date === date)
		setTaskNow(task)
	}
	function completeAll() {
		tasks.forEach((task) => {
			if (task.date === date) {
				task.completed = true
			}
		})
		dispatch({ type: 'tasks/setTasks', payload: tasks })
		setTask()
	}
	function unComplete() {
		tasks.forEach((task) => {
			if (task.date === date) {
				task.completed = false
			}
		})
		dispatch({ type: 'tasks/setTasks', payload: tasks })
		setTask()
	}
	function showUncompleted() {
		let shown = taskNow.filter((task) => task.completed === false)
		setTaskNow(shown)
	}
	return (
		<>
			<div id="app" className="flex w-screen h-auto mt-12">
				<div className="w-1/6 h-full bg-grey-darkest"></div>
				<div className="flex-col w-full h-full bg-grey-lightest rounded-lg p-2 shadow-md">
					<H1 className="text-gray-600 dark:text-gray-300">Todos</H1>
					<Input
						type="date"
						color="cyan"
						size="regular"
						outline={true}
						value={date}
						placeholder="Select Date"
						onChange={(e) => setDate(e.target.value)}
					/>
					<div className="flex items-center border-b border-b-2 border-teal py-2">
						<input
							className="font-sans font-thin text-2xl appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none"
							type="text"
							placeholder="New Todo"
							onKeyUp={(e) => addTask(e)}
							onChange={(e) => setTodo(e.target.value)}
							ref={inputEl}
						/>
						<Button
							color="lightBlue"
							buttonType="outline"
							size="regular"
							rounded={true}
							block={false}
							iconOnly={false}
							ripple="dark"
							onClick={(e) => addTask(e)}
						>
							Add
						</Button>
					</div>
					<div className="sm:flex justify-evenly w-full mt-6">
						<Button
							className="m-2"
							color="lightBlue"
							buttonType="outline"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="dark"
							onClick={() => completeAll()}
						>
							<Icon name="done" size="sm" />
						</Button>
						<Button
							className="m-2"
							color="lightBlue"
							buttonType="outline"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={true}
							ripple="dark"
							onClick={() => unComplete()}
						>
							<Icon name="restore" size="sm" />
						</Button>
						<Button
							className="m-2"
							color="pink"
							size="sm"
							rounded={true}
							block={false}
							iconOnly={false}
							ripple="dark"
							onClick={() => showUncompleted()}
						>
							show uncompleted
						</Button>
					</div>
					{taskNow.map((task) => {
						return <Cards key={task.id} task={task} />
					})}
					<Button
						className="w-full text-white py-2 px-8 mt-4 rounded"
						onClick={() => clearAllComplete()}
					>
						Clear Completed Task
					</Button>
					<div className="container mx-auto px-6">
						<div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
							<div className="sm:w-2/3 text-center py-6">
								<p className="text-sm text-blue-700 font-bold mb-2">
									© Reza Habrizal 2021
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-1/6 h-full bg-grey-darkest"></div>
			</div>
		</>
	)
}

export default App
