import employeeDashboardReducer, {
    EMPLOYEES_RECEIVED,
    EMPLOYEES_REQUESTED,
    EMPLOYEES_ERROR_RECEIVED
} from 'routes/Home/modules/employeeDashboard'

describe('employeeDashboardReducer', () => {
  it(`should set state to fetch when ${EMPLOYEES_REQUESTED} action called`, () => {
    let state
    state = employeeDashboardReducer({
      items: [],
      hasLoaded:false,
      isFetching:false,
      hasError:false,
      isInvalidated:false,
      error:null },
      { type:EMPLOYEES_REQUESTED })
    console.log(state)
    expect(state.isFetching).to.be.true
  })
})


describe('employeeDashboardReducer', () => {
  it(`should add items to array when ${EMPLOYEES_RECEIVED} action called`, () => {
    let state
    state = employeeDashboardReducer({
      items: [],
      hasLoaded:false,
      isFetching:true,
      hasError:false,
      isInvalidated:false,
      error:null },
      { type:EMPLOYEES_RECEIVED, employees: [{ firstName: 'test' }, { firstName: 'test2' }] })
    expect(state.items.length).to.equal(2)
    expect(state.isFetching).to.be.false
    expect(state.hasError).to.be.false
    expect(state.hasLoaded).to.be.true
  })
})

describe('employeeDashboardReducer', () => {
  it(`Should set error to true when ${EMPLOYEES_ERROR_RECEIVED} action called`, () => {
    let state
    let error = {}
    state = employeeDashboardReducer({
      items: [],
      hasLoaded:false,
      isFetching:true,
      hasError:false,
      isInvalidated:false,
      error:null },
      { type: EMPLOYEES_ERROR_RECEIVED, error: error })

    expect(state.items.length).to.equal(0)
    expect(state.isFetching).to.be.false
    expect(state.hasError).to.be.true
    expect(state.error).to.deep.equal(error)
    expect(state.hasLoaded).to.be.true
  })
})
