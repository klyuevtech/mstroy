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
    const children = this.getChildren(id)
    return children.concat(children.map((child: ItemType) => this.getAllChildren(child.id)).flat())
  }

  public getAllParents(id: IdType): ItemType[] {
    const parent = this.getItem(id)
    if (!parent?.parent) {
      return []
    }
    return [parent].concat(this.getAllParents(parent.parent))
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
