import { validusername, isExternal } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validusername', () => {
    expect(validusername('admin')).toBe(true)
    expect(validusername('editor')).toBe(true)
    expect(validusername('xxxx')).toBe(false)
  })
  it('isExternal', () => {
    expect(isExternal('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(isExternal('github.com/PanJiaChen/vue-element-admin')).toBe(false)
    expect(isExternal('/dashboard')).toBe(false)
    expect(isExternal('./dashboard')).toBe(false)
    expect(isExternal('dashboard')).toBe(false)
  })
})
