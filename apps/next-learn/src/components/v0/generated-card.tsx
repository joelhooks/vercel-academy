import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react' // Ensure lucide-react is installed

interface GeneratedCardProps {
	title: string
	date: string
	time?: string | null
	location?: string | null
}

export function GeneratedCard({ title, date, time, location }: GeneratedCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm">
				<div className="flex items-center gap-2">
					<CalendarIcon className="size-4 text-muted-foreground" />
					<span>{date}</span>
					{time && (
						<>
							<ClockIcon className="size-4 text-muted-foreground ml-2" />
							<span>{time}</span>
						</>
					)}
					{!time && <span className="text-muted-foreground">(Time not specified)</span>}
				</div>
				<div className="flex items-center gap-2">
					<MapPinIcon className="size-4 text-muted-foreground" />
					<span>
						{location || <span className="text-muted-foreground">Location not specified</span>}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
