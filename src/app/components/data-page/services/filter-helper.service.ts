
export class FilterHelperService {
	public static applyFilter(filterInput: string, dataSource: any[]) {
		const filterRegex = /^(\w+)\s*(<=|>=|!=|=|:|<|>)\s*(.+)$/;
		const match = filterInput.match(filterRegex);
		let value: string | number;
		
    if (match) {
			const column = match[1];
			const operator = match[2];

			// Determine if value is numeric or string
			if (!isNaN(Number(match[3]))) {
				value = Number(match[3]); // Convert to number if numeric
			} else {
				value = match[3]; // Keep as string
			}

			const filteredDataSource = dataSource.filter((row) => {
				switch (operator) {
					case '>':
						return row[column] > value;
					case '<':
						return row[column] < value;
					case '=':
					case ':':
						return row[column] == value; // Support `:`
					case '!=':
						return row[column] != value;
					case '>=':
						return row[column] >= value;
					case '<=':
						return row[column] <= value;
					default:
						return false;
				}
			});
			return filteredDataSource;
		} else {
			return dataSource;
		}
	}
}
