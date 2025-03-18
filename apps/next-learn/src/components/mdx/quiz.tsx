'use client'

import { clsx } from 'clsx'
import { useEffect, useState, type JSX } from 'react'
import Cookies from 'js-cookie'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

// Define constants for styles and dimensions
const DIMENSIONS = {
	QUIZ_PLACEHOLDER_HEIGHT: 'h-[697px]',
	ICON_CONTAINER: 'h-[56px] w-[56px]',
	QUESTION_CONTAINER_WIDTH: 'w-[200px]',
	CONTENT_MAX_WIDTH: 'max-w-[640px]',
	EXPLANATION_MAX_WIDTH: 'max-w-[380px]',
}

const ICON_SIZES = {
	QUIZ_ICON: 32,
	BADGE_ICON: 16,
}

// Cookie management utility
const COOKIE_CONFIG = {
	NAME: 'finishedQuizes',
	EXPIRES_DAYS: 30, // Cookie will expire after 30 days
	PATH: '/',
}

const QuizCookies = {
	getCompletedQuizzes(): string[] {
		try {
			const cookieValue = Cookies.get(COOKIE_CONFIG.NAME)
			return cookieValue ? JSON.parse(cookieValue) : []
		} catch (error) {
			console.error('Error parsing quiz cookie:', error)
			return []
		}
	},

	saveCompletedQuiz(question: string): void {
		try {
			const completedQuizzes = this.getCompletedQuizzes()
			if (!completedQuizzes.includes(question)) {
				completedQuizzes.push(question)
				Cookies.set(COOKIE_CONFIG.NAME, JSON.stringify(completedQuizzes), {
					expires: COOKIE_CONFIG.EXPIRES_DAYS,
					path: COOKIE_CONFIG.PATH,
				})
			}
		} catch (error) {
			console.error('Error saving quiz cookie:', error)
		}
	},

	hasCompletedQuiz(question: string): boolean {
		return this.getCompletedQuizzes().includes(question)
	},
}

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
	const hasBeenAnsweredCorrectly = mounted ? QuizCookies.hasCompletedQuiz(question) : false

	function checkAnswer(): void {
		if (selectedAnswer === correctAnswer) {
			setState('correct')
			QuizCookies.saveCompletedQuiz(question)
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
			<div
				className={`bg-blue-50 dark:bg-blue-950 mt-12 flex ${DIMENSIONS.QUIZ_PLACEHOLDER_HEIGHT} flex-col justify-center rounded-[16px] py-12`}
			/>
		)
	}

	return (
		<div className="bg-blue-50 dark:bg-blue-950 not-prose mt-12 flex flex-col justify-center rounded-[16px] px-4 py-4 md:-mx-[62px] md:px-0 md:py-14">
			<div className="flex flex-col items-center">
				<div
					className={`mb-4 flex ${DIMENSIONS.ICON_CONTAINER} items-center justify-center rounded-full bg-blue-700`}
				>
					<svg
						className="text-gray-100"
						fill="none"
						height={ICON_SIZES.QUIZ_ICON}
						viewBox={`0 0 ${ICON_SIZES.QUIZ_ICON} ${ICON_SIZES.QUIZ_ICON}`}
						width={ICON_SIZES.QUIZ_ICON}
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
								<rect
									fill="currentColor"
									height={ICON_SIZES.QUIZ_ICON}
									width={ICON_SIZES.QUIZ_ICON}
								/>
							</clipPath>
						</defs>
					</svg>
				</div>
				<h3 className="text-xl md:text-2xl font-semibold">It&apos;s time to take a quiz!</h3>
				<div
					className={`md:max-w-auto ${DIMENSIONS.QUESTION_CONTAINER_WIDTH} text-center md:w-auto`}
				>
					<p className="pt-2 text-gray-900 dark:text-gray-200">
						Test your knowledge and see what you&apos;ve just learned.
					</p>
				</div>
			</div>
			<div
				className={`bg-white dark:bg-gray-800 mx-auto mt-8 flex w-full ${DIMENSIONS.CONTENT_MAX_WIDTH} flex-col items-center rounded-lg p-4 shadow-md md:p-8`}
			>
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
										<Icon name="check" size={ICON_SIZES.BADGE_ICON} />
										Correct
									</span>
								</Badge>
							) : (
								<Badge className="my-6" variant="outline">
									<span className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
										<Icon name="close" size={ICON_SIZES.BADGE_ICON} />
										Not quite
									</span>
								</Badge>
							)}

							<p
								className={`text-center mx-auto w-full ${DIMENSIONS.EXPLANATION_MAX_WIDTH} text-gray-700 dark:text-gray-300 text-sm`}
							>
								{state === 'correct' || hasBeenAnsweredCorrectly
									? explanation
									: hint
										? `Hint: ${hint}`
										: ''}
							</p>
						</div>
					</div>
				)}
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
							<Icon name="arrow-left" size={ICON_SIZES.BADGE_ICON} />
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
