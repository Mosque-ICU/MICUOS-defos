import {TaskList, Task} from 'ink-task-list';
import spinners from 'cli-spinners';
import React, {useState} from 'react';

export const MainThread = ({commands = []}) => {
	const [status, setStatus] = useState('running');

	if (status === 'running') {
		return (
			<TaskList>
				{commands.map((command, index) => (
					<Task
						key={index}
						label={command.label}
						state={command.state}
						spinner={command.state === 'loading' ? spinners.dots : undefined}
						isExpanded={command.isExpanded}
					>
						{command.children &&
							command.children.map((child, childIndex) => (
								<Task
									key={childIndex}
									label={child.label}
									state={child.state}
									spinner={
										child.state === 'loading' ? spinners.dots : undefined
									}
								/>
							))}
					</Task>
				))}
				{/* Add static tasks here if needed */}
				<Task label="Pending" state="pending" />
				<Task label="Loading" state="loading" spinner={spinners.dots} />
				<Task label="Success" state="success" />
				<Task label="Warning" state="warning" />
				<Task label="Error" state="error" />
				<Task label="Item with children" isExpanded>
					<Task label="Loading" state="loading" spinner={spinners.dots} />
				</Task>
			</TaskList>
		);
	}

	return <SecondaryThread />;
};

const SecondaryThread = ({children}) => {
	return <>{children}</>;
};
