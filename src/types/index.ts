export type IdType = number | string

export type ItemType = {
  id: IdType
  parent: IdType | null
  label: string
}
