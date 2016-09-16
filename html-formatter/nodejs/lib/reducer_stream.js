import Stream from 'stream'
import { reducer } from 'cucumber-react'

class ReducerStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
    this._state = reducer()
  }

  _transform(event, _, callback) {
    this._state = reducer(this._state, event)
    callback()
  }

  _flush(callback) {
    this.push(this._state)
    callback()
  }
}

export default ReducerStream
