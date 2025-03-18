import React from 'react'

interface StepsProps {
	children: React.ReactNode
}

// This component wraps the list of steps
export function Steps({ children }: StepsProps) {
	// Convert children to an array for easier manipulation
	const childrenArray = React.Children.toArray(children)

	// Add step numbers to each child
	const steps = childrenArray.map((child, index) => {
		// If the child is a valid React element that we can clone
		if (React.isValidElement(child)) {
			// Create a step with the appropriate number
			return (
				<Step key={index} number={index + 1}>
					{child}
				</Step>
			)
		}
		return child
	})

	return (
		<div className="steps-container my-8 relative ml-4 border-l border-gray-200 dark:border-gray-800 pl-8 pb-2">
			{steps}
		</div>
	)
}

interface StepProps {
	children: React.ReactNode
	number?: number
}

// This component represents a single step
export function Step({ children, number = 1 }: StepProps) {
	return (
		<div className="step-item mb-8 relative">
			<div className="step-number absolute -left-10 -mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
				{number}
			</div>
			<div className="step-content">{children}</div>
		</div>
	)
}
