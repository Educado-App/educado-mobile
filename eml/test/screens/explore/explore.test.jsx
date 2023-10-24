
import { shouldUpdate, determineCategory } from './utilityFunctions';

import React from 'react';

describe('Explore', () => {

  describe('shouldUpdate', () => {

    it('should return true if arrays are different', () => {
      const courses1 = [{ id: 1 }, { id: 2 }];
      const courses2 = [{ id: 1 }, { id: 3 }];

      const result = shouldUpdate(courses1, courses2);

      expect(result).toBe(true);
    });

    it('should return false if arrays are the same', () => {
      const courses1 = [{ id: 1 }, { id: 2 }];
      const courses2 = [{ id: 1 }, { id: 2 }];

      const result = shouldUpdate(courses1, courses2);

      expect(result).toBe(false);
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
});
