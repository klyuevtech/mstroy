import type { IdType, ItemType } from '../types'

export class TreeStore {
  #items: ItemType[] = []

  constructor(items: ItemType[]) {
    this.#items = items
  }

  public getAll(): ItemType[] {
    return this.#items
  }

  public getItem(id: IdType): ItemType | undefined {
    return this.#items.find((item: ItemType) => item.id === id)
  }

  public getChildren(id: IdType): ItemType[] {
    return this.#items.filter((item: ItemType) => item.parent === id)
  }

  public getAllChildren(id: IdType): ItemType[] {
    const allChildren: ItemType[] = []
    const queue: IdType[] = []

    // Start with direct children
    const directChildren = this.getChildren(id)
    allChildren.push(...directChildren)
    queue.push(...directChildren.map((child) => child.id))

    // Process descendants
    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = this.getChildren(currentId)

      for (const child of children) {
        allChildren.push(child)
        queue.push(child.id)
      }
    }

    return allChildren
  }

  public getAllParents(id: IdType): ItemType[] {
    const parents: ItemType[] = []
    let currentItem = this.getItem(id)

    while (currentItem?.parent) {
      const parentItem = this.getItem(currentItem.parent)
      if (parentItem) {
        parents.push(parentItem)
        currentItem = parentItem
      } else {
        break
      }
    }

    return parents
  }

  public addItem(item: ItemType): void {
    this.#items.push(item)
  }

  public updateItem(item: ItemType): void {
    const index = this.#items.findIndex((i: ItemType) => i.id === item.id)
    if (index !== -1) {
      this.#items[index] = item
    }
  }
}
