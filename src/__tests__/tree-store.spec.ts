import { describe, it, expect, beforeEach } from 'vitest'
import { TreeStore } from '../models/tree-store'
import type { ItemType } from '../types'

describe('TreeStore', () => {
  const mockItems: ItemType[] = [
    { id: 1, parent: null, label: 'Айтем 1' },
    { id: '91064cee', parent: 1, label: 'Айтем 2' },
    { id: 3, parent: 1, label: 'Айтем 3' },
    { id: 4, parent: '91064cee', label: 'Айтем 4' },
    { id: 5, parent: '91064cee', label: 'Айтем 5' },
    { id: 6, parent: '91064cee', label: 'Айтем 6' },
    { id: 7, parent: 4, label: 'Айтем 7' },
    { id: 8, parent: 4, label: 'Айтем 8' },
  ]

  let treeStore: TreeStore

  beforeEach(() => {
    treeStore = new TreeStore(mockItems)
  })

  describe('getAll', () => {
    it('should return all items', () => {
      const result = treeStore.getAll()
      expect(result).toEqual(mockItems)
      expect(result.length).toBe(8)
    })
  })

  describe('getItem', () => {
    it('should return the correct item when it exists', () => {
      const result = treeStore.getItem(3)
      expect(result).toEqual({ id: 3, parent: 1, label: 'Айтем 3' })
    })

    it('should return undefined when item does not exist', () => {
      const result = treeStore.getItem(999)
      expect(result).toBeUndefined()
    })
  })

  describe('getChildren', () => {
    it('should return direct children of an item', () => {
      const result = treeStore.getChildren(1)
      expect(result).toEqual([
        { id: '91064cee', parent: 1, label: 'Айтем 2' },
        { id: 3, parent: 1, label: 'Айтем 3' },
      ])
    })

    it('should return empty array when item has no children', () => {
      const result = treeStore.getChildren(5)
      expect(result).toEqual([])
    })
  })

  describe('getAllChildren', () => {
    it('should return all descendants of an item', () => {
      const result = treeStore.getAllChildren(1)
      expect(result).toEqual([
        { id: '91064cee', parent: 1, label: 'Айтем 2' },
        { id: 3, parent: 1, label: 'Айтем 3' },
        { id: 4, parent: '91064cee', label: 'Айтем 4' },
        { id: 5, parent: '91064cee', label: 'Айтем 5' },
        { id: 6, parent: '91064cee', label: 'Айтем 6' },
        { id: 7, parent: 4, label: 'Айтем 7' },
        { id: 8, parent: 4, label: 'Айтем 8' },
      ])
    })

    it('should return empty array when item has no descendants', () => {
      const result = treeStore.getAllChildren(5)
      expect(result).toEqual([])
    })
  })

  describe('getAllParents', () => {
    it('should return all ancestors of an item', () => {
      const result = treeStore.getAllParents(7)
      expect(result).toEqual([
        { id: 4, parent: '91064cee', label: 'Айтем 4' },
        { id: '91064cee', parent: 1, label: 'Айтем 2' },
        { id: 1, parent: null, label: 'Айтем 1' },
      ])
    })

    it('should return empty array for root items', () => {
      const result = treeStore.getAllParents(1)
      expect(result).toEqual([])
    })

    it('should return empty array for non-existent items', () => {
      const result = treeStore.getAllParents(999)
      expect(result).toEqual([])
    })
  })

  describe('addItem', () => {
    it('should add a new item to the store', () => {
      const newItem: ItemType = { id: 7, parent: 2, label: 'New Item' }
      treeStore.addItem(newItem)

      const allItems = treeStore.getAll()
      expect(allItems.length).toBe(9)
      expect(allItems).toContainEqual(newItem)
    })
  })

  describe('updateItem', () => {
    it('should update an existing item', () => {
      const updatedItem: ItemType = { id: 3, parent: 2, label: 'Updated Item' }
      treeStore.updateItem(updatedItem)

      const result = treeStore.getItem(3)
      expect(result).toEqual(updatedItem)
    })

    it('should not modify the array when updating a non-existent item', () => {
      const originalLength = treeStore.getAll().length
      const nonExistentItem: ItemType = { id: 999, parent: 1, label: 'Non-existent' }
      treeStore.updateItem(nonExistentItem)

      const allItems = treeStore.getAll()
      expect(allItems.length).toBe(originalLength)
      expect(allItems).not.toContainEqual(nonExistentItem)
    })
  })
})
