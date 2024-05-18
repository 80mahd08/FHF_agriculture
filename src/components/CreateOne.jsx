const CreateOne = ({ type }) => {
	return (
		<>
			{type === "dwa" ? (
				<div className="form-group">
					<form action="">
						<table>
							<tbody>
								<tr>
									<td>Name:</td>
									<td>
										<input type="text" name="dwaName" />
									</td>
								</tr>
								<tr>
									<td>Type:</td>
									<td>
										<input type="text" name="dwaType" />
									</td>
								</tr>
								<tr>
									<td>Elkmiya:</td>
									<td>
										<input type="text" name="dwaElkmiya" />
									</td>
								</tr>
								<tr>
									<td>Date start:</td>
									<td>
										<input type="date" name="dwaDateStart" />
									</td>
								</tr>
								<tr>
									<td>Date fin:</td>
									<td>
										<input type="date" name="dwaDateFin" />
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<input type="submit" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			) : (
				<div className="form-group">
					<form action="">
						<table>
							<tbody>
								<tr>
									<td>Name:</td>
									<td>
										<input type="text" name="mousemName" />
									</td>
								</tr>
								<tr>
									<td>Num:</td>
									<td>
										<input type="text" name="mousemNum" />
									</td>
								</tr>
								<tr>
									<td>Count:</td>
									<td>
										<input type="text" name="mousemCount" />
									</td>
								</tr>
								<tr>
									<td>start:</td>
									<td>
										<input type="text" name="mousemStart" />
									</td>
								</tr>
								<tr>
									<td>fin:</td>
									<td>
										<input type="text" name="mousemFin" />
									</td>
								</tr>
								<tr>
									<td>prix:</td>
									<td>
										<input type="text" name="mouemFin" />
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<input type="submit" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			)}
		</>
	);
};

export default CreateOne;
