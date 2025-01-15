"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const WorkoutPage: React.FC = () => {
	const [date, setDate] = useState("");
	const [memo, setMemo] = useState("");
	const [createdBy, setCreatedBy] = useState("");
	const [records, setRecords] = useState([
		{
			typeId: null,
			name: "",
			part: "",
			weight: "",
			reps: "",
			sets: "",
			comment: "",
		},
	]);
	const [types, setTypes] = useState([]);

	const workout_id = useEffect(() => {
		// Typeデータの取得
		const fetchTypes = async () => {
			const res = await fetch("/api/part");
			const data = await res.json();
			setTypes(data);
		};
		fetchTypes();
	}, []);

	// 投稿する際に使うid。簡易的に。
	const wid = Math.floor(Math.random() * (65535 + 1));

	const router = useRouter();

	const handleInputChange = (index, event) => {
		const { name, value } = event.target;
		const newRecords = [...records];
		newRecords[index][name] = value;
		setRecords(newRecords);
	};

	const handleAddRecord = () => {
		setRecords([
			...records,
			{
				name: "",
				part: "",
				weight: "",
				reps: "",
				sets: "",
				comment: "",
				typeId: null,
			},
		]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const res = await fetch("/api/workout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ date, memo, createdBy, records, id: wid }),
		});

		if (res.ok) {
			router.push("/"); // 成功後にホームページにリダイレクト
		} else {
			// エラーハンドリング
			console.error("Failed to submit workout");
		}
	};

	return (
		<Box maxW="xl" mx="auto" mt={8}>
			<form onSubmit={handleSubmit}>
				<Stack spaceY={4}>
					<Box id="date">
						<Box>日付</Box>
						<Input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</Box>

					<Box id="memo">
						<Box>メモ</Box>
						<Textarea
							value={memo}
							onChange={(e) => setMemo(e.target.value)}
						/>
					</Box>

					<Box id="createdBy">
						<Box>作成者ID</Box>
						<Input
							type="number"
							value={createdBy}
							onChange={(e) => setCreatedBy(e.target.value)}
						/>
					</Box>
					{records.map((record, index) => (
						<Box
							key={index}
							borderWidth="1px"
							borderRadius="md"
							p={4}
						>
							<Box id={`typeId-${index}`}>
								<Box>タイプ</Box>
								<select
									name="typeId"
									value={record.typeId}
									onChange={(e) =>
										handleInputChange(index, e)
									}
								>
									<option value="">選択してください</option>
									{types.map((type) => (
										<option key={type.id} value={type.id}>
											{" "}
											{type.name} - {type.part}
										</option>
									))}
								</select>
								<Box id={`weight-${index}`}>
									<Box>重量 (kg)</Box>
									<Input
										name="weight"
										value={record.weight}
										onChange={(e) =>
											handleInputChange(index, e)
										}
									/>
								</Box>

								<Box id={`reps-${index}`}>
									<Box>レップ数</Box>
									<Input
										name="reps"
										value={record.reps}
										onChange={(e) =>
											handleInputChange(index, e)
										}
									/>
								</Box>

								<Box id={`sets-${index}`}>
									<Box>セット数</Box>
									<Input
										name="sets"
										value={record.sets}
										onChange={(e) =>
											handleInputChange(index, e)
										}
									/>
								</Box>

								<Box id={`comment-${index}`}>
									<Box>コメント</Box>
									<Textarea
										name="comment"
										value={record.comment}
										onChange={(e) =>
											handleInputChange(index, e)
										}
									/>
								</Box>
							</Box>
						</Box>
					))}

					<Button onClick={handleAddRecord}>追加する</Button>
					<Button type="submit" colorScheme="blue">
						送信する
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default WorkoutPage;
