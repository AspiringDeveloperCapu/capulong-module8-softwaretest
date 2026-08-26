import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RecordList from './RecordList.vue'

describe('RecordList', () => {
  const assets = [
    {
      _id: '1',
      assetName: 'Dell Laptop',
      serialNumber: 'SN12345',
      assetType: 'Laptop',
      assignedTo: 'John Doe',
      status: 'Assigned',
      location: 'IT Office',
      department: 'IT',
      cost: 1500
    }
  ]

  it('renders asset information', () => {
    const wrapper = mount(RecordList, {
      props: { assets }
    })

    expect(wrapper.text()).toContain('Dell Laptop')
    expect(wrapper.text()).toContain('SN12345')
    expect(wrapper.text()).toContain('Laptop')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Assigned')
  })

  it('displays the empty state when there are no assets', () => {
    const wrapper = mount(RecordList, {
      props: { assets: [] }
    })

    expect(wrapper.text()).toContain('No assets found')
  })

  it('emits edit when the edit button is clicked', async () => {
    const wrapper = mount(RecordList, {
      props: { assets }
    })

    const editButton = wrapper.find('button[title="Edit Asset"]')
    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0]).toEqual([assets[0]])
  })

  it('emits delete when the delete button is clicked', async () => {
    const wrapper = mount(RecordList, {
      props: { assets }
    })

    const deleteButton = wrapper.find('button[title="Delete Asset"]')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([assets[0]])
  })
})
