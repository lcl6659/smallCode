const mockData = {
  getSmsCaptcha: [null, {
    code: 200,
    data: {}
  }]
}

export default {
  getSmsCaptcha (params) {
    return new Promise((resolve) => {
      resolve(mockData.getSmsCaptcha)
    })
  }
}
