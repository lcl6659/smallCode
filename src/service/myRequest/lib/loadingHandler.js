class LoadingController {
  constructor(loading) {
    this.loadingCount = 0
    this.loadingTimer = null
    this.loading = loading
  }

  showLoading (CLoading) {
    if (CLoading) {
      this.loadingCount += 1
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer)
        this.loadingTimer = null
      } else {
        if (this.loadingCount === 1) {
          this.loading.show()
        }
      }
    }
  }

  hideLoading (CLoading) {
    if (CLoading) {
      this.loadingCount -= 1
      if (this.loadingCount === 0) {
        this.loadingTimer = setTimeout(() => {
          this.loading.hide()
          this.loadingTimer = null
        }, 2)
      }
    }
  }
}

export default LoadingController
