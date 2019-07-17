export const draggable = {
  data() {
      return {
          isTouchDevice: false,
          scrollX: 0,
          scrollY: 0,
          mouseDown: false,
          mouseMove: false,
          dragStartX: 0,
          dragStartY: 0,
          minX: 0,
          maxX: 0,
          minY: 0,
          maxY: 0
      }
  },
  watch: {
      // El scroll de la parrilla no es algo que está presente en el dom, con lo que hay que mantener manualmente el binding
      scrollX(newScroll) {
          // Acotar el scroll al tamaño real http://www.hnldesign.nl/work/code/javascript-limit-integer-min-max/
          const valBetween = Math.min(this.maxX, Math.max(this.minX, newScroll))
          this.scrollX = valBetween
          this.$refs.drag.scrollLeft = valBetween
      },
      scrollY(newScroll) {
          const valBetween = Math.min(this.maxY, Math.max(this.minY, newScroll))
          this.scrollY = valBetween
          this.$refs.drag.scrollTop = valBetween
      },
  },
  mounted() {
      // Si se trata de un dispositivo con pantalla táctil mantener el comportamiento nativo de scroll con touch en los overflow: scroll
      this.isTouchDevice = ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
      if (!this.isTouchDevice) {
          if ('ontouchstart' in window) {
              this.$refs.drag.addEventListener('touchstart', this.handleMouseDown)
              this.$refs.drag.addEventListener('touchend', this.handleMouseUp)
              this.$refs.drag.addEventListener('touchmove', this.handleMouseMove)
              this.$refs.drag.addEventListener('scroll', this.handleScroll)
          } else {
              this.$refs.drag.addEventListener('mousedown', this.handleMouseDown)
              this.$refs.drag.addEventListener('mouseup', this.handleMouseUp)
              this.$refs.drag.addEventListener('mousemove', this.handleMouseMove)
              this.$refs.drag.addEventListener('mouseleave', this.handleMouseUp)
          }
      }
      this.$refs.drag.addEventListener('scroll', this.handleScroll)
      this.setDimensions()
  },
  updated() {
      // Cuando entran nuevos contenidos puede cambiar el tamaño del contenedor
      this.setDimensions()
  },
  destroyed() {
      if (this.$refs.drag) {
          if ('ontouchstart' in window) {
              this.$refs.drag.removeEventListener('touchstart', this.handleMouseDown)
              this.$refs.drag.removeEventListener('touchend', this.handleMouseUp)
              this.$refs.drag.removeEventListener('touchmove', this.handleMouseMove)
          } else {
              this.$refs.drag.removeEventListener('mousedown', this.handleMouseDown)
              this.$refs.drag.removeEventListener('mouseup', this.handleMouseUp)
              this.$refs.drag.removeEventListener('mousemove', this.handleMouseMove)
              this.$refs.drag.removeEventListener('mouseleave', this.handleMouseUp)
          }
          this.$refs.drag.removeEventListener('scroll', this.handleScroll)
      }
  },
  methods: {
      setDimensions() {
          this.maxX = this.$refs.drag.scrollWidth - this.$refs.drag.clientWidth
          this.maxY = this.$refs.drag.scrollHeight - this.$refs.drag.clientHeight
      },
      handleMouseDown(e) {
          if (!e.touches) {
              e.preventDefault()
          }
          this.mouseDown = true
          this.mouseMove = false
          this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
          this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
      },
      handleScroll(e) {
          // Evitar el doble scroll si ya se está moviendo
          if(!this.mouseMove) {
              this.scrollX = e.target.scrollLeft
              this.scrollY = e.target.scrollTop
          }
      },
      handleMouseMove(e) {
          if (this.mouseDown) {
              this.mouseMove = true
              let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX
              let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY
              let dragDistanceX = positionX - this.dragStartX
              let dragDistanceY = positionY - this.dragStartY

              this.scrollX -= dragDistanceX
              this.scrollY -= dragDistanceY
              this.dragStartX += dragDistanceX
              this.dragStartY += dragDistanceY
          }
      },
      handleMouseUp() {
          this.mouseMove = false
          this.mouseDown = false
      }
  },
  computed: {
      dragging() {
          return this.mouseMove
      },
      inBeginningX() {
          return this.scrollX <= this.minX
      },
      inEndX() {
          return this.scrollX >= this.maxX
      },
      inBeginningY() {
          return this.scrollY <= this.minY
      },
      inEndY() {
          return this.scrollY >= this.maxY
      }
  }
}
