import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TreeStoreTable from '../components/tree-store-table/tree-store-table.vue'

describe('TreeStoreTable', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(TreeStoreTable)
    expect(wrapper.text()).toContain('Tree store')
  })
})
