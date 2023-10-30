// Tests for utility functions used in ExploreCard.jsx, Explore.jsx and CourseCard.jsx



import {
	getDifficultyLabel,
	determineCategory,
	determineIcon,
	getUpdatedDate,
} from '../../services/utilityFunctions';

describe('ExploreCard', () => {

	describe('getDifficultyLabel', () => {
		it('should return "Iniciante" for level 1', () => {
			const result = getDifficultyLabel(1);
			expect(result).toBe('Iniciante');
		});

		it('should return "Intermediário" for level 2', () => {
			const result = getDifficultyLabel(2);
			expect(result).toBe('Intermediário');
		});

		it('should return "Avançado" for level 3', () => {
			const result = getDifficultyLabel(3);
			expect(result).toBe('Avançado');
		});
	});

	describe('determineCategory', () => {
		it('should return the translated category', () => {
			const category = 'personal finance';
			const translatedCategory = determineCategory(category);

			expect(translatedCategory).toBe('Finanças pessoais');
		});
		it('should return the translated category', () => {
			const category = 'health and workplace safety';
			const translatedCategory = determineCategory(category);

			expect(translatedCategory).toBe('Saúde e segurança no trabalho');
		});
		it('should return the translated category', () => {
			const category = 'sewing';
			const translatedCategory = determineCategory(category);

			expect(translatedCategory).toBe('Costura');
		});
		it('should return the translated category', () => {
			const category = 'electronics';
			const translatedCategory = determineCategory(category);

			expect(translatedCategory).toBe('Eletrônica');
		});
		it('should return "Outro" for unknown categories', () => {
			const category = 'unknown category';
			const translatedCategory = determineCategory(category);

			expect(translatedCategory).toBe('Outro');
		});
	});

	describe('determineIcon', () => {
		it('should return the right icon', () => {
			const category = 'personal finance';
			const icon = determineIcon(category);

			expect(icon).toBe('finance');
		});
		it('should return the right icon', () => {
			const category = 'health and workplace safety';
			const icon = determineIcon(category);

			expect(icon).toBe('medical-bag');
		});
		it('should return the right icon', () => {
			const category = 'sewing';
			const icon = determineIcon(category);

			expect(icon).toBe('scissors-cutting');
		});
		it('should return the right icon', () => {
			const category = 'electronics';
			const icon = determineIcon(category);

			expect(icon).toBe('laptop');
		});
		it('should return the right icon', () => {
			const category = 'unknown category';
			const icon = determineIcon(category);

			expect(icon).toBe('bookshelf');
		});
	});

	describe('getUpdatedDate', () => {
		it('should format the date correctly', () => {
			// Create a date in a known format for testing
			const inputDate = '2023-10-26T00:00:00.000Z';
			const expectedOutput = '2023/10/26';

			// Call the function with the input date
			const result = getUpdatedDate(inputDate);

			// Check if the result matches the expected output
			expect(result).toBe(expectedOutput);
		});

		it('should format the date correctly and ignore time', () => {
			const inputDate = '2023-12-31T15:15:30.100Z';
			const expectedOutput = '2023/12/31';

			const result = getUpdatedDate(inputDate);

			expect(result).toBe(expectedOutput);
		});
	});


});