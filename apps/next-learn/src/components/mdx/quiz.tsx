'use client'

import { clsx } from 'clsx'
import { useEffect, useState, type JSX } from 'react'
import Cookies from 'js-cookie'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface QuizProps {
	question: string
	answers: string[]
	correctAnswer: string
	hint?: string
	explanation: string
}

export function Quiz({
	question,
	answers,
	correctAnswer,
	hint,
	explanation,
}: QuizProps): JSX.Element {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
	const [mounted, setMounted] = useState(false)
	const [state, setState] = useState<'idle' | 'correct' | 'incorrect'>('idle')
	const finishedQuizes = Cookies.get('finishedQuizes')
		? (JSON.parse(Cookies.get('finishedQuizes') as string) as string[])
		: null
	const hasBeenAnsweredCorrectly = finishedQuizes?.includes(question)

	function checkAnswer(): void {
		if (selectedAnswer === correctAnswer) {
			setState('correct')

			const newQuizes = finishedQuizes ? [...finishedQuizes, `${question}`] : [`${question}`]
			Cookies.set('finishedQuizes', JSON.stringify(newQuizes))
		} else {
			setState('incorrect')
		}
	}

	const selectedAnswerIndex = selectedAnswer ? answers.indexOf(selectedAnswer) : 0

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div className="bg-blue-50 dark:bg-blue-950 mt-12 flex h-[697px] flex-col justify-center rounded-[16px] py-12" />
		)
	}

	return (
		<div className="bg-blue-50 dark:bg-blue-950 not-prose mt-12 flex flex-col justify-center rounded-[16px] px-4 py-4 md:-mx-[62px] md:px-0 md:py-14">
			<div className="flex flex-col items-center">
				<div className="mb-4 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-blue-700">
					<svg
						className="text-gray-100"
						fill="none"
						height="32"
						viewBox="0 0 32 32"
						width="32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_132_19094)">
							<path
								clipRule="evenodd"
								d="M16 30.5C24.0081 30.5 30.5 24.0081 30.5 16C30.5 7.99187 24.0081 1.5 16 1.5C7.99187 1.5 1.5 7.99187 1.5 16C1.5 24.0081 7.99187 30.5 16 30.5ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.5 22C17.5 22.8284 16.8284 23.5 16 23.5C15.1716 23.5 14.5 22.8284 14.5 22C14.5 21.1716 15.1716 20.5 16 20.5C16.8284 20.5 17.5 21.1716 17.5 22ZM13.5142 11.3218C13.9564 10.391 14.9041 9.75 16 9.75C17.5188 9.75 18.75 10.9812 18.75 12.5C18.75 13.8852 17.7252 15.0323 16.3926 15.2223C15.8162 15.3045 15.25 15.787 15.25 16.5V17.25V18H16.75V17.25V16.6839C18.7397 16.3292 20.25 14.5916 20.25 12.5C20.25 10.1528 18.3472 8.25 16 8.25C14.3035 8.25 12.8406 9.24406 12.1593 10.6782L11.8375 11.3556L13.1924 11.9993L13.5142 11.3218Z"
								fill="currentColor"
								fillRule="evenodd"
							/>
						</g>
						<defs>
							<clipPath id="clip0_132_19094">
								<rect fill="currentColor" height="32" width="32" />
							</clipPath>
						</defs>
					</svg>
				</div>
				<h3 className="text-xl md:text-2xl font-semibold">It's time to take a quiz!</h3>
				<div className="md:max-w-auto w-[200px] text-center md:w-auto">
					<p className="pt-2 text-gray-900 dark:text-gray-200">
						Test your knowledge and see what you've just learned.
					</p>
				</div>
			</div>
			<div className="bg-white dark:bg-gray-800 mx-auto mt-8 flex w-full max-w-[640px] flex-col items-center rounded-lg p-4 shadow-md md:p-8">
				{state === 'idle' && !hasBeenAnsweredCorrectly ? (
					<>
						<div className="text-center">
							<p className="text-base md:text-lg m-0 font-medium">{question}</p>
						</div>
						<div className="border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-950 group mt-4 w-full rounded-lg border md:mt-6">
							{answers.map((a, i) => (
								<button
									className={clsx(
										'border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 flex w-full items-center gap-3 border-b p-3 text-left text-sm transition-colors first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-none md:p-4 md:text-base',
										{
											'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100':
												selectedAnswer === a,
											'text-gray-900 dark:text-gray-200': selectedAnswer !== a,
										},
									)}
									key={a}
									onClick={(): void => setSelectedAnswer(a)}
									type="button"
								>
									<div
										aria-hidden
										className={clsx(
											'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-medium transition-colors',
											{
												'bg-blue-300 text-blue-900 dark:bg-blue-800 dark:text-blue-200':
													selectedAnswer !== a,
												'bg-blue-700 text-blue-100 dark:bg-blue-600': selectedAnswer === a,
											},
										)}
										data-char
									>
										{String.fromCharCode(65 + i)}
									</div>
									{a}
								</button>
							))}
						</div>
					</>
				) : (
					<div className="flex w-full flex-1 flex-col items-center">
						<p className="text-center text-base m-0">{question}</p>
						<div className="border-gray-200 dark:border-gray-700 mt-6 flex w-full flex-1 flex-col items-center justify-center rounded-lg border p-8">
							<div
								className={clsx('mb-2 flex h-8 w-8 items-center justify-center rounded-full', {
									'bg-blue-300 text-blue-900 dark:bg-blue-800 dark:text-blue-200':
										state === 'correct' || hasBeenAnsweredCorrectly,
									'bg-gray-400 text-gray-900 dark:bg-gray-600 dark:text-gray-200':
										state === 'incorrect',
								})}
							>
								{String.fromCharCode(65 + selectedAnswerIndex)}
							</div>
							<p className="m-0 font-medium">
								{hasBeenAnsweredCorrectly ? correctAnswer : selectedAnswer}
							</p>
							{state === 'correct' || hasBeenAnsweredCorrectly ? (
								<Badge className="my-6" variant="outline">
									<span className="flex items-center gap-1 text-green-600 dark:text-green-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
										Correct
									</span>
								</Badge>
							) : (
								<Badge className="my-6" variant="outline">
									<span className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
										Not quite
									</span>
								</Badge>
							)}

							<p className="text-center mx-auto w-full max-w-[380px] text-gray-700 dark:text-gray-300 text-sm">
								{/* eslint-disable-next-line no-nested-ternary */}
								{state === 'correct' || hasBeenAnsweredCorrectly
									? explanation
									: hint
										? `Hint: ${hint}`
										: ''}
							</p>
						</div>
					</div>
				)}
				{/* eslint-disable-next-line no-nested-ternary */}
				{state === 'correct' || hasBeenAnsweredCorrectly ? null : state === 'incorrect' ? (
					<div className="mt-6 flex justify-center">
						<Button
							onClick={(): void => {
								setState('idle')
								setSelectedAnswer(null)
							}}
							variant="outline"
							className="flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
							Try Again
						</Button>
					</div>
				) : (
					<div className="mt-4 flex w-full justify-end md:mt-6">
						<div className="w-full md:w-fit">
							<Button onClick={checkAnswer} className="w-full">
								Check Answer
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
