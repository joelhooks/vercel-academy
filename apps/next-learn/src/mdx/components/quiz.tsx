'use client'

import { clsx } from 'clsx'
import { useEffect, useState, useId, type JSX } from 'react'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleHelp, CheckCircle2 } from 'lucide-react'
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

interface QuizOptionProps {
	text: string
	isSelected: boolean
	isSubmitted: boolean
	onSelect: () => void
	optionId: string
	quizId: string
}

const QuizOption = ({
	text,
	isSelected,
	isSubmitted,
	onSelect,
	optionId,
	quizId,
}: QuizOptionProps) => {
	const optionClasses = clsx(
		'group relative overflow-hidden rounded-lg border bg-background/50 transition-all',
		'hover:border-blue-500/50 hover:bg-accent/50 focus-within:ring-2 focus-within:ring-blue-500',
		isSelected && !isSubmitted && 'ring-1 ring-blue-500 bg-accent/30',
	)

	return (
		<div className={optionClasses}>
			<label className="flex w-full cursor-pointer items-start gap-4 p-4" htmlFor={optionId}>
				<input
					type="radio"
					id={optionId}
					name={`quiz-option-${quizId}`}
					checked={isSelected}
					onChange={onSelect}
					className="h-4 w-4 mt-[2px] border-muted text-blue-600"
					disabled={isSubmitted}
					aria-disabled={isSubmitted}
				/>
				<span className="flex-1 text-sm">{text}</span>
			</label>
		</div>
	)
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
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)
	const hasBeenAnsweredCorrectly = mounted ? QuizCookies.hasCompletedQuiz(question) : false
	const uniqueId = useId()

	function checkAnswer(): void {
		if (selectedAnswer === correctAnswer) {
			setIsCorrect(true)
			QuizCookies.saveCompletedQuiz(question)
		} else {
			setIsCorrect(false)
		}
		setIsSubmitted(true)
	}

	function handleRetry(): void {
		setSelectedAnswer(null)
		setIsSubmitted(false)
		setIsCorrect(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			checkAnswer()
		}
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div className="space-y-8 rounded-xl border bg-gradient-to-b from-background to-accent/20 shadow-sm my-6 relative h-[697px] flex flex-col justify-center" />
		)
	}

	return (
		<section
			className="not-prose space-y-8 rounded-xl border bg-gradient-to-b from-background to-accent/20 shadow-sm my-6 relative"
			aria-labelledby={`${uniqueId}-title`}
		>
			<div className="space-y-6">
				<div className="flex items-center gap-4 border-b p-6 bg-accent/30">
					<div className="rounded-full bg-accent border p-3 flex-shrink-0">
						<CircleHelp size={24} aria-hidden="true" />
					</div>
					<div className="flex flex-col gap-1">
						<p id={`${uniqueId}-title`} className="text-2xl font-medium tracking-tight">
							Knowledge Check
						</p>
						<p className="text-sm text-muted-foreground">
							Test your understanding of the concepts you&apos;ve learned.
						</p>
					</div>
				</div>

				<div className="space-y-6 px-6 relative">
					<p className="text-lg font-medium leading-relaxed" id={`${uniqueId}-question`}>
						{question}
					</p>
					<div className="grid gap-3" role="radiogroup" aria-labelledby={`${uniqueId}-question`}>
						{answers.map((answer, index) => (
							<QuizOption
								key={answer}
								text={answer}
								isSelected={selectedAnswer === answer}
								isSubmitted={isSubmitted}
								onSelect={() => !isSubmitted && setSelectedAnswer(answer)}
								optionId={`${uniqueId}-option-${index}`}
								quizId={uniqueId}
							/>
						))}
					</div>

					<AnimatePresence>
						{isSubmitted && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-50 bg-background"
							>
								<div className="h-full p-6 flex items-center justify-center">
									<motion.div
										initial={{ scale: 0.95, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ duration: 0.3, delay: 0.2 }}
										className="w-full space-y-4"
									>
										{isCorrect || hasBeenAnsweredCorrectly ? (
											<div className="rounded-xl border my-auto bg-emerald-50/50 dark:bg-emerald-950/20 p-6 space-y-4">
												<div className="flex items-center gap-3">
													<div className="rounded-full bg-emerald-500/20 border !border-emerald-500/20 p-2">
														<CheckCircle2 className="h-6 w-6 text-emerald-500" />
													</div>
													<p className="text-xl font-medium">That&apos;s correct!</p>
												</div>
												<p className="text-muted-foreground text-sm leading-relaxed">
													{explanation}
												</p>
											</div>
										) : (
											<>
												<div
													className="rounded-lg p-4 border bg-red-500/10 !border-red-500/30"
													role="alert"
												>
													<p className="font-medium">Sorry, that&apos;s not correct.</p>
													{hint && <p className="mt-2 text-sm opacity-90">Hint: {hint}</p>}
												</div>
												<Button
													onClick={handleRetry}
													variant="outline"
													className="w-full sm:w-auto"
												>
													<Icon name="arrow-left" size={16} />
													Try Again
												</Button>
											</>
										)}
									</motion.div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="px-6 pb-6">
					<Button
						onClick={checkAnswer}
						onKeyDown={handleKeyDown}
						disabled={selectedAnswer === null || isSubmitted}
						className="w-full bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
						aria-disabled={selectedAnswer === null || isSubmitted}
					>
						Check Answer
					</Button>
				</div>
			</div>
		</section>
	)
}
