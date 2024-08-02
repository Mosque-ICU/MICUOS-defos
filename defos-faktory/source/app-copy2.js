import React, {useState, useEffect} from 'react';
// import {render} from 'ink';
import fs from 'node:fs';
import path from 'node:path';
// import stripAnsi from 'strip-ansi';
// import childProcess from 'node:child_process';
// import {MainThread} from './progress'; // Adjust this import based on your actual file structure
import CreatePkgJson from './create-pkg-json';

/**================================================================================================
 *?                                       Execution block

the main thread should only concerned with the steps

first it will
 * checks if a package json already exists
	 - if a package json exists then it will prompt the user to the creation of a new package json

 * of a subprocess. In a real-world scenario, you'd likely want to pass the subprocess
 * command and any necessary arguments to this component.
 *
 * The output and error states are managed in this component, and the MainThread component
 * is responsible for rendering them.
 *
 *================================================================================================**/

function usePackageDetails() {
	const [output, setOutput] = useState('');
	const [error, setError] = useState('');
	const [fileExists, setFileExists] = useState(false);

	useEffect(() => {
		// Path to the package.json file
		const filePath = path.join(process.cwd(), 'package.json');

		// Check if the package.json file exists
		fs.access(filePath, fs.constants.F_OK, err => {
			if (err) {
				setFileExists(false);
			} else {
				setFileExists(true);

				// Uncomment and configure subprocess logic here if needed
				// const subProcess = childProcess.spawn('npx', ['lerna', 'init']);
				//
				// // Handle stdout
				// subProcess.stdout.on('data', newOutput => {
				// 	const lines = stripAnsi(newOutput.toString('utf8')).split('\n');
				// 	setOutput(prevOutput => `${prevOutput}\n${lines.slice(-5).join('\n')}`);
				// });
				//
				// // Handle stderr
				// subProcess.stderr.on('data', errOutput => {
				// 	setError(prevError => `${prevError}\n${stripAnsi(errOutput.toString('utf8'))}`);
				// });
				//
				// // Handle errors
				// subProcess.on('error', err => {
				// 	setError(prevError => `${prevError}\nError: ${err.message}`);
				// });
				//
				// // Cleanup on unmount
				// return () => {
				// 	subProcess.kill();
				// };
			}
		});
	}, []);

	return {output, error, fileExists};
}

const App = () => {
	const {output, error, fileExists} = usePackageDetails();

	if (!fileExists) {
		return <CreatePkgJson />;
	}

	return <></>;

	// return (
	// <MainThread>
	// {
	/*
				Uncomment the following block if you need to display command output and errors
				<Box flexDirection="column" padding={1}>
					<Text>Command output:</Text>
					<Box marginTop={1}>
						<Text>{fileExists ? output : 'package.json does not exist.'}</Text>
					</Box>
					{error && (
						<Box marginTop={1}>
							<Text color="red">Error:</Text>
							<Text color="red">{error}</Text>
						</Box>
					)}
				</Box>
			 */
	// }
	// </MainThread>
	// );
};

export default App;
