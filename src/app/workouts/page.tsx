"use client";

import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Separator } from "@chakra-ui/react";

interface Workout {
	workout_id: number;
	date: string;
	memo: string;
	createdBy: number;
	record_id: number;
	tid: number;
	weight: number;
	reps: number;
	sets: number;
	comment: string;
	type_name: string;
	type_part: string;
}

const WorkoutsPage: React.FC = () => {
	const [workouts, setWorkouts] = useState<Workout[]>([]);

	useEffect(() => {
		const fetchWorkouts = async () => {
			const res = await fetch("/api/records");
			const data = await res.json();
			setWorkouts(data);
		};
		fetchWorkouts();
	}, []);

	return (
		<Box maxW="xl" mx="auto" mt={8}>
			<Heading as="h1" mb={4}>
				記録されたWorkouts
			</Heading>
			<VStack gap={4}>
				{workouts.map((workout) => (
					<Box
						key={workout.workout_id}
						borderWidth="1px"
						borderRadius="md"
						p={4}
						w="100%"
					>
						<Text fontWeight="bold">
							日付: {new Date(workout.date).toLocaleDateString()}
						</Text>
						<Text>メモ: {workout.memo}</Text>
						<Text>作成者ID: {workout.createdBy}</Text>
						<Separator my={2} />
						<Text fontWeight="bold">
							レコードID: {workout.record_id}
						</Text>
						<Text>
							タイプ: {workout.type_name} - {workout.type_part}
						</Text>
						<Text>重量: {workout.weight} kg</Text>
						<Text>レップ数: {workout.reps}</Text>
						<Text>セット数: {workout.sets}</Text>
						<Text>コメント: {workout.comment}</Text>
					</Box>
				))}
			</VStack>
		</Box>
	);
};

export default WorkoutsPage;
