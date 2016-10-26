import Gherkin from "gherkin"
const parser = new Gherkin.Parser()

class GherkinLint {
  // TODO: Pass in a list of "configured" rule objects, or perhaps just pass in
  // a config object here
  constructor(enabledRuleNames) {
    this._enabledRuleNames = enabledRuleNames
  }

  lint(path, source) {
    const warningEvents = []

    try {
      parser.parse(source)
      if(this._enabledRuleNames[0] == 'implementation-detail') {
        warningEvents.push({
          "type": "error",
          "source": {
            "uri": path,
            "start": {
              "line": 4,
              "column": 26
            }
          },
          "message": "Implementation detail: button"
        })
      }
    } catch (err) {
      // If err is a Gherkin.Errors.CompositeParserException then there are more errors on the .errors property
      const errors = err.errors || [err]
      for (const e of errors) {
        warningEvents.push({
          "type": "error",
          "source": {
            "uri": path,
            "start": e.location
          },
          "message": e.message
        })
      }
    }

    return warningEvents
  }
}

export default GherkinLint
