interface RafCallback {
    callback: Function
    priority: number
}

class Raf {
    callbacks: RafCallback[]
    now: number

    constructor() {
        if (process.server) {
            return
        }

        this.callbacks = []
        this.now = performance.now()
        requestAnimationFrame(this.raf.bind(this))
    }

    public add(callback: Function, priority = 0) {
        this.callbacks.push({ callback, priority })
        this.callbacks.sort((a, b) => a.priority - b.priority)

        return () => this.remove(callback)
    }

    public remove(callback: Function) {
        this.callbacks = this.callbacks.filter(({ callback: cb }) => callback !== cb)
    }

    private raf(now: number) {
        requestAnimationFrame(this.raf.bind(this))
    
        const deltaTime = now - this.now
        this.now = now
    
        for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i].callback(now, deltaTime)
        }
    }
}
  
const raf = new Raf()


export const useRaf = (callback: Function, priority = 0) => {
   return raf.add(callback, priority)
}